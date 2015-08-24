'use strict';

var http = require('http');
var Router = require('node-simple-router');
var auth = require('http-auth');


var Server = function (source, configIn) {

  var config = {
    port: configIn.port || 3007,
    realm: configIn.realm || "voicer-web",
    auth: configIn.auth || false,
    username: configIn.username || "user",
    password: configIn.password || "password"
  };

  var basic = auth.basic({
        realm: config.realm
    }, function (username, password, callback) { // Custom authentication method.
        callback(username === config.username 
          && password === config.password);
    }
  );

  var authFunction = function (req, res) {
    if (config.auth) {
      basic();
    };
  };

  var router = Router({
      static_route: __dirname + "/public",
      logging: false
  });

  router.get("/peernames.json", function (request, response) {
    source.getData()
      .then(function (data) {
        response.end(data);
      })
      .fail(function (error) {
        response.end(error);
      });
  });

  router.post("/peernames.json", function (request, response) {
    var data = JSON.stringify(request.post, null, '  ');
    source.saveData(data)
      .then(function () {
        response.end('ok');
      })
      .fail(function (error) {
        response.end(error);
      });
  });

  this.start = function () {
    http.createServer(authFunction, router).listen(config.port);
  };

};

module.exports = Server;