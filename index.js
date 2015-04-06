'use strict';

var http = require('http');
var Router = require('node-simple-router');

var Server = function (source, config) {

  var router = Router({static_route: __dirname + "/public"});

  router.get("/peernames.json", function (request, response) {
    source.getData(function (error, data) {
      if (!error) {
        response.end(data);
      } else {
        response.end('error');
      }
    });
  });

  router.post("/peernames.json", function (request, response) {
    var data = JSON.stringify(request.post);
    source.saveData(data, function (error) {
      if (!error) {
        response.end('ok');
      } else {
        response.end('fail');
      }
    });
  });

  this.start = function () {
    http.createServer(router).listen(config.port);
  };

};

module.exports = Server;