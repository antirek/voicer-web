
var Server = require('../index');
var fs = require('fs');
var Q = require('q');

var source = {
  getData: function () {
  	var defer = Q.defer();
    fs.readFile('peernames.json', function (err, result){
    	if (err) {
    		defer.reject(err);
    	} else { 
    		defer.resolve(result);
    	}
    });
    return defer.promise;
  },
  saveData: function (data, callback) {
  	var defer = Q.defer();
    fs.writeFile('peernames.json', data, function (err, result) {
    	if (err) {
    		defer.reject(err);
    	} else { 
    		defer.resolve(result);
    	}
    });
    return defer.promise;
  }
};

var config = {
  port: 30011,
  auth: true,
  username: 'vasiliy',
  password: 'test',
  realm: 'Hello!'
};

var server = new Server(source, config);
server.start();