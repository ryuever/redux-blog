var config = require('config');

exports.setCookie = function(req, res, cookieId, cookieValue){
  var cookieOptions = {
    domain: config.cookiesDomain,
    path: config.cookiesPath,
    expires: new Date(Date.now() + config.cookieExpires * 1000)
  };

  res.cookie(cookieId, cookieValue, cookieOptions);
}
