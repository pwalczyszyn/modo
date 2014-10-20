/* jshint node:true*/
'use strict';

var configs = {
    defaults: {
        'cookie secret': process.env.COOKIE_SECRET
    },
    local: {
        url: 'http://localhost:3000',
        ip: '127.0.0.1',
        port: process.env.PORT || 3000,
        db: 'mongodb://localhost/robolex'
    },
    openshift: {
        ip: process.env.OPENSHIFT_NODEJS_IP,
        port: process.env.OPENSHIFT_NODEJS_PORT,
        db: 'mongodb://' + process.env.OPENSHIFT_MONGODB_DB_USERNAME + ':' + process.env.OPENSHIFT_MONGODB_DB_PASSWORD + '@' + process.env.OPENSHIFT_MONGODB_DB_HOST + ':' + process.env.OPENSHIFT_MONGODB_DB_PORT + '/' + process.env.OPENSHIFT_APP_NAME
    }
};


function applySettings(app, settings) {
    if (settings) {
        var key;
        for (key in settings) {
            app.set(key, settings[key]);
        }
    }
}

module.exports = function (app) {
    applySettings(app, configs.defaults);
    applySettings(app, configs[process.env.APP_ENV || 'local']);
};
