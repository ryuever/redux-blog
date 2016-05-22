var express = require('express');
port = process.env.port || 5000;

var app = express();
var config = require('config');

// 通过这个设置，wepback就会在server中内容进行修改以后，
// 自动进行编译
var webpack = require('webpack');
var webpack_config = require('../webpack/webpack.config.dev-client.js');
var compiler = webpack(webpack_config);

var isDev = process.env.NODE_ENV === 'development';

/* if (isDev) {
   app.use(require('webpack-dev-middleware')(compiler, {
   noInfo: true,
   publicPath: webpack_config.output.publicPath
   }));

   app.use(require('webpack-hot-middleware')(compiler));
   } */

require('./config/express')(app);
require('./config/routes')(app);
require('./components/mongodb');

app.listen(port, function(err, res){
  if(err)
    console.log('Error on connecting port ', port);
  console.log("Connected on port : ", port);
});
