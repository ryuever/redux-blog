var _ = require('lodash');
var Promise = require('bluebird');
var config = require('config');

var Cookie = require('../mixins/cookie');
var User = require('../models').User;

exports.postLogin = function(req, res, next){
  const {email, password} = req.body;
  let $user = User.findOne({email: email}).exec();
  $user.then ((user) =>{
    if (user){
      user.comparePassword(password, function(err, isMatch){
        if (isMatch){

          var cookieOptions = {
            domain: config.cookiesDomain,
            expires: new Date(Date.now() + config.cookieExpires * 1000)
          };
          res.cookie('uid', user._id, cookieOptions);
          req.session.sessionId = user._id;
          return res.status(200).send(user);
        }else {
          console.log('running not match');
          return res.status(500).send('login error');
        }
      })
    }
  })
};

exports.postAutoLogin = function(req, res, next){

  if(req.cookies.uid){
    console.log("req cookies uid : ", req.cookies.uid);

    let $user = User.findOne({_id: req.cookies.uid}).exec();
    $user
      .then(function(user){
        if (user){
          req.session.sessionId = req.cookies.uid;
          return res.status(200).send(user);
        }
      })
      .catch(function(err){
        if(err){
          console.log("err : ", err);
        }
      })
  }else{
    console.log('auto login fail');
    return res.status(200).send('{}');
  }
}

exports.postSignUp = function(req, res, next){
  let {email, password} = req.body;
  let $user = User.findOne({email: email}).exec();

  $user
    .then(function(existingUser){
      if(existingUser){
        throw new Error('Dulplicate user');    // bypass promise chain
      }
      let user = new User({
        email: email,
        password: password
      });

      return user.save();
    })

    .then(function(user){
      Cookie.setCookie(req, res, 'uid', user._id);
      return res.status(200).send(user);
    })
    .catch((err)=>{
      if (err){
        return res.status(500).send('error');
      }
    });
};

exports.getLogout = function(req, res, next){
  var cookieOptions = {
    domain: config.cookiesDomain
  };
  res.clearCookie('uid', cookieOptions);
  req.session.destroy(function(e){ res.status(200).send({data: 'ok'}); });
};
