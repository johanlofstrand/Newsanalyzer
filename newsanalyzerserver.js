var app = require('express')()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server);

server.listen(7000);

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/newsanalyzer.html');
});

io.sockets.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('clientcallback', function (data) {
    console.log(data);
  });
});