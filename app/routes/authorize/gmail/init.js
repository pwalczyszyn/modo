'use strict';

var google = require('googleapis');
var OAuth2 = google.auth.OAuth2;

module.exports = function(req, res) {

  var oauth2Client = new OAuth2(
    req.app.get('gmail_client_id'),
    req.app.get('gmail_client_secret'),
    'http://localhost:8080/authorize/gmail/callback'
  );

  var url = oauth2Client.generateAuthUrl({
    access_type: 'offline', // 'online' (default) or 'offline' (gets refresh_token)
    scope: ['https://www.googleapis.com/auth/gmail.readonly']
  });

  // res.render('www/home', { name: 'John' });
  res.redirect(url);

};
