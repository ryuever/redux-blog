var mongoose = require('mongoose');
var config = require('config');
var logger = require('graceful-logger');

mongoose.promise = require('bluebird');

var opt = {};
if(config.mongoAuthDB)
  opt = {"auth": {"authdb":config.mongoAuthDB}};

var db = mongoose.createConnection(config.mongodb, opt);
db.once('open', function(){
  logger.info('MongoDB has been connected on port 27017');
});

module.exports = db;
