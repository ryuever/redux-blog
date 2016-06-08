require('babel-register')({
  presets: [ 'es2015', 'react' ]
});

var React = require('react');
var ReactDOM = require('react-dom/server');
var Router = require('react-router');

var RoutingContext = Router.RouterContext;

// var routes = require('../../app/routes.jsx');

var App = require('../../public/assets/server');
var apis = require('../routes/api');

module.exports = function(app){
  app.use(function(req, res, next){
    if(req.session.sessionId){
      req._sessionId = req.session.sessionId;
    } // else if(req.cookies.uid){
    //   req._sessionId = req.cookies.uid;
    //   console.log('req sessionid from cookie', req._sessionId);
    // }

    next();
  });

  app.use('/api', apis);

  /* app.use(function(req, res){
     Router.match({routes: routes.default, location: req.url}, function(err, redirectLocation, renderProps){
     if(err){
     console.log('err 1');
     res.status(500).send(err.message);
     }else if (redirectLocation){
     console.log('error 2');
     res.status(302).redirect(redirectLocation.pathname + redirectLocation.search);
     }else if (renderProps){
     console.log('3 ----------, renderProps', renderProps);
     // res.status(200).send(ReactDOM.renderToString(<RoutingContext {...renderProps} />))
     try {
     var html = ReactDOM.renderToString(React.createElement(Router.RouterContext, renderProps));
     } catch(e) {
     console.log('erro r : ', e);
     }
     console.log('html : ', html);
     res.render('index', {
     html: html
     });
     }else{
     res.status(404).send("Page Not Found");
     }
     });
     }); */


  app.use(function (req, res) {
    console.log("magic dayede ----------------", req.url, req.cookies.uid);
    App.default(req, res);
  });

  app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  // development error handler
  // will print stacktrace
  /* if (app.get('env') === 'development') {
     app.use(function(err, req, res, next) {
     console.log('dev---eror');
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
     console.log('dev---eror 2');
     res.render('error', {
     message: err.message,
     error: {}
     });
     }); */
};
