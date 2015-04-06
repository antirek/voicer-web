
var Server = require('../index');
var fs = require('fs');

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