'use strict';

var http = require('http');
var Router = require('node-simple-router');

var Server = function (source, config) {

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
    var data = JSON.stringify(request.post);
    source.saveData(data)
      .then(function () {
        response.end('ok');
      })
      .fail(function (error) {
        response.end(error);
      });
  });

  this.start = function () {
    http.createServer(router).listen(config.port);
  };

};

module.exports = Server;