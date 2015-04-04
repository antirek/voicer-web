
var http = require('http');
var Router = require('node-simple-router');
var fs = require('fs');

var router = Router();

var source = {
  getData: function (callback) {
    fs.readFile('peernames.json', callback);
  },
  saveData: function (data, callback) {
    fs.writeFile('peernames.json', data, callback);
  }
};

var Server = function (router, source) {
  
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
    http.createServer(router).listen(3007);
  };
  
};

var server = new Server(router, source);
server.start();
