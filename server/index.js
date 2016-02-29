var webpack = require ('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require("webpack-hot-middleware");

var config = require('../webpack.config');

var express = require('express');
port = process.env.port || 5000;

var app = express();

var compiler = webpack(config);
app.use(webpackDevMiddleware(compiler, {noInfo: true, publicPath:config.output.assetsPath}));
app.use(webpackHotMiddleware(compiler));

require('./config/express')(app);
require('./config/routes')(app);
require('./components/mongodb');

app.listen(port, function(err, res){
  if(err)
    console.log('Error on connecting port ', port);
  console.log("Connected on port : ", port);
});
