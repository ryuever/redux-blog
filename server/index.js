var express = require('express');
port = process.env.port || 5000;

var app = express();
var config = require('config');
var webpack = require('webpack');
var webpack_config = require('../webpack/'+config.webpackConf);
var compiler = webpack(webpack_config);

var isDev = process.env.NODE_ENV === 'dev';

if (isDev) {
  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: webpack_config.output.publicPath
  }));

  app.use(require('webpack-hot-middleware')(compiler));
}

require('./config/express')(app);
require('./config/routes')(app);
require('./components/mongodb');

app.listen(port, function(err, res){
  if(err)
    console.log('Error on connecting port ', port);
  console.log("Connected on port : ", port);
});
