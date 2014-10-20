'use strict';

var express = require('express');
var app = express();

// Set the configurations
require('./config/globals')(app);

// Set the configurations
require('./config/express')(app);

// Set the configurations
require('./config/routes')(app);

app.listen(8080);
