'use strict';

var google = require('googleapis');
var OAuth2 = google.auth.OAuth2;

var secrets = require('./client_secret.js');

var oauth2Client = new OAuth2(
  secrets.client_id,
  secrets.client_secret,
  'http://localhost:8080/authorize/gmail/callback'
);

module.exports = function(req, res) {


  var url = oauth2Client.generateAuthUrl({
    access_type: 'offline', // 'online' (default) or 'offline' (gets refresh_token)
    scope: ['https://www.googleapis.com/auth/gmail.readonly']
  });

  // res.render('www/home', { name: 'John' });
  res.redirect(url);

};
