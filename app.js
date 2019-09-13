const Server = require('./index');

var config = {
  port: 3000,
};

var server = new Server(config);
server.start();