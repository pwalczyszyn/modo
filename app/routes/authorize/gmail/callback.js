'use strict';

module.exports = function(req, res) {

  // http://localhost:8080/oauth2callback?code=XXXX
  res.render('www/home', { name: 'John' });

};
