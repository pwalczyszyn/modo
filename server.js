'use strict';

var express = require('express');
var app = express();

var suex = require('suex');

// Set the configurations
require('./config/globals')(app);

// Set the configurations
require('./config/express')(app);

// Set the configurations
require('./config/static')(app);

// Set the configurations
require('./config/routes')(app);



function start(callback) {

    console.log('Starting Express server at %s:%s...', app.get('ip'), app.get('port'));

    // Start the server
    app.listen(app.get('port'), app.get('ip'), function () {
        console.log('Express server listening on port ' + app.get('port'));
        if (callback) {
            callback();
        }
    }).on('error', function (err) {
        if (callback) {
            callback(err);
        }
    });
}
// Exporting for test framework to be able to start it
exports.start = start;

function stop(callback) {
    app.close(callback);
}
// Exporting for test framework to be able to start it
exports.stop = stop;

// Starting if doesn't have a parent so it's not a test run
if (!module.parent) {
    start();
}
