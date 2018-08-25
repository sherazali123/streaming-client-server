//server.js
const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

process.on('SIGTERM', function() {
  console.log('Bandwidth used', totalSizeBytes);
  process.exit(0);
});

io.on('connection', function(socket) {
  socket.on('chunk', function(chunk) {
    console.log(chunk);
  });
});

http.listen(8080, function() {});
