'use strict';

module.exports = function(req, res) {

  // http://localhost:8080/oauth2callback?code=4/prGGEESv1UmQX-R6sdtbvx3f6HGODwvxG5UJjOavXDg.AsPVaSliDY0coiIBeO6P2m-415xTkgI
  res.render('www/home', { name: 'John' });

};
