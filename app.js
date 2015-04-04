
var http = require('http');
var Router = require('node-simple-router');
var fs = require('fs');

var router = Router();

router.get("/hello", function (request, response) {
  response.end("Hello, World!");
});

router.get("/peernames.json", function (request, response) {
  fs.readFile('peernames.json', function (error, data) {
    if(!error){
      response.end(data);
    }else{
      response.end('error');
    }
  });
});

router.post("/peernames.json", function (request, response) {
  console.log(request.post);
  var data = JSON.stringify(request.post);  
  fs.writeFile('peernames.json', data, function (err) {
    if (!err){
      response.end('ok');
    }else{
      response.end('fail');
    }
  });
  
});
var server = http.createServer(router);

server.listen(3007);