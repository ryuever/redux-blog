User = require('../models/user');



module.exports = auth = function(options={}){
  let _auth = function(req, res, callback){
    if(req.session.sessionId){
      req.set('_sessionId', req.session.sessionId);
    }else if(req.cookies.uid){
      console.log("req.cookie.uid : ", req.cookie.uid);
    }
  };
}

// userModel = require '../modules/user'

// _user = (req, res, callback = ->) ->
//   {uid} = req.get()

//   userModel.findOne _id: uid
//   .exec()
//   .then (user) ->

//     unless user
//       cookieOptions =
//         domain: config.cookiesDomain
//         path: config.cookiesPath
//         expires: new Date (Date.now() + 86400 * 1000)

//       res.clearCookie 'user', cookieOptions

//       req.session.destroy ()->
//         return res.redirect '/_webhook/'

//     req.set 'user', user
//     callback()

// auth = (options = {}) ->

//   _auth = (req, res, callback = ->) ->
//     if req.session?.uid
//       req.set 'uid', req.session?.uid
//       _user req, res, callback

//     else if req.cookies?.user
//       req.set 'uid', req.cookies?.user
//       _user req, res, callback

//     else
//       return res.redirect '/_webhook/'

//   return _auth
// module.exports = auth
