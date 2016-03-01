var _ = require('lodash');
var Promise = require('bluebird');
var User = require('../models/user');
var Cookie = require('../mixins/cookie');
var config = require('config');

exports.postLogin = function(req, res, next){
  const {email, password} = req.body.data;
  let $user = User.findOne({email: email}).exec();
  $user.then ((user) =>{
    if (user){
      user.comparePassword(password, function(err, isMatch){
        if (isMatch){

          var cookieOptions = {
            domain: config.cookiesDomain,
            path: '/',
            expires: new Date(Date.now() + config.cookieExpires * 1000)
          };
          res.cookie('uid', user._id, cookieOptions);
          req.session.sessionId = user._id;
          return res.status(200).send('login successful');
        }else {
          return res.status(500).send('login error');
        }
      })
    }
  })
};

exports.postSignUp = function(req, res, next){
  let {email, password} = req.body.data;
  let $user = User.findOne({email: email}).exec();

  $user
    .then(function(existingUser){
      console.log("check existing user", existingUser);
      if(existingUser){
        res.status(500).send("already exist");
        console.log('$user is : ', $user);
        // return Promise.reject();
        throw new Error('Dulplicate user');    // bypass promise chain
      }
      let user = new User({
        email: email,
        password: password
      });

      return user.save();
    })

    .then(function(user){
      console.log('save successful !', user);
      Cookie.setCookie(req, res, 'uid', user._id);
      return res.status(200).send('sign up successful !');
    })
    .catch((err)=>{
      if (er){
        console.log('signup error', err);
      }
    });
};

exports.getLogout = function(req, res, next){
  res.status(200).send('logout successful !');
};
