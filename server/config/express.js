var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var path = require('path');
var config = require('config');
var morgan = require('morgan');

var session = require('express-session');

module.exports = function(app){
  app.use(cookieParser());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true})); // for parsing application/x-www-form-urlencoded
  app.set('views', path.join(__dirname, '..', './views'));
  app.set('view engine', 'jade');
  app.use(express.static(path.join(__dirname, '..', '..', 'public')));
  app.use(morgan('combined'));

  var sess ={
    secret: config.sessionSecret,
    resave: false,
    saveUninitialized: true,
    name: 'sid',
    cookie:{
      maxAge: 86400 * 1000,
      // path: config.cookiesPath
      Domain: config.cookiesDomain
    }
  };

  app.use(session(sess));

  // app.use(function(req, res, next){
  //   console.log('req.cookies.uid : ', req.cookies);
  //   next();
  // })
};
