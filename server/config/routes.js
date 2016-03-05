require('babel-register')({
  presets: [ 'es2015', 'react' ]
});
// require('node-jsx').install({extension: '.jsx'});
var React = require('react');
var ReactDOM = require('react-dom/server');
var Router = require('react-router');

var routes = require('../../app/routes.jsx');

var apis = require('../routes/api');
// var users  = require('../routes/users');
// var blogs  = require('../routes/blogs');

module.exports = function(app){
  //  app.use('/', routes);
  // app.use('/users', users);
  // app.use('/blog', blogs);
  app.use(function(req, res, next){
    // console.log("check sessionId ---------- ", req.session);
    console.log("check req.session id ", req.session.sessionId);
    if(req.session.sessionId){
      console.log('set session id');
      // req.set('_sessionId', req.session.sessionId);
      req._sessionId = req.session.sessionId;
      console.log("req._sessionId : ", req._sessionId);
    } // else if(req.cookies.uid){
    //   req._sessionId = req.cookies.uid;
    //   console.log('req sessionid from cookie', req._sessionId);
    // }

    next();
  });

  app.use('/api', apis);

  app.use(function(req, res){
    Router.match({routes: routes.default, location: req.url}, function(err, redirectLocation, renderProps){
      if(err){
        res.status(500).send(err.message);
      }else if (redirectLocation){
        res.status(302).redirect(redirectLocation.pathname + redirectLocation.search);
      }else if (renderProps){
        var html = ReactDOM.renderToString(React.createElement(Router.RouterContext, renderProps));
        res.render('index', {
          html: html
        });
      }else{
        res.status(404).send("Page Not Found");
      }
    });
  });

  // catch 404 and forward to error handler
  app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  // error handlers

  // development error handler
  // will print stacktrace
  if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
      res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: err
      });
    });
  }

  // production error handler
  // no stacktraces leaked to user
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: {}
    });
  });

};
