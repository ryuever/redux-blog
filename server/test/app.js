var express = require('express');

var app = express();

require('../config/express')(app);
require('../config/routes')(app);

module.exports = app;
