
var Server = require('../index');
var Router = require('node-simple-router');
var fs = require('fs');

//var router = Router();

var source = {
  getData: function (callback) {
    fs.readFile('peernames.json', callback);
  },
  saveData: function (data, callback) {
    fs.writeFile('peernames.json', data, callback);
  }
};

var config = {
  port: 3007
};

var server = new Server(source, config);
server.start();