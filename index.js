var http = require('http');
var Router = require('node-simple-router');

class Server  {
  constructor (config = {}) {
    this.port = config.port || 3007;
  }

  start () {
    var router = Router({
      static_route: __dirname,
      logging: false
    });

    http.createServer(router).listen(this.port);
  };
};

module.exports = Server;