'use strict';

const BASE_URL = 'http://localhost:8080';

const request = require('request');
const io = require('socket.io-client');
const socket = io.connect(BASE_URL, { reconnect: true });

// to manage the chunks of steaming to minimize the number of requests
const Queue = require('./Queue.js');
const queue = new Queue();

// Add a connect listener
socket.on('connect', function(socket) {});
/*
*  This function will be called for each event.  (eg: for each sensor reading)
*  Modify it as needed.
*/
module.exports = (eventMsg, encoding, callback) => {
  // here we will be gathering received bytes so
  // we can send to received after specific interval
  // the purpose is to maintain a queue to minimize the number of requests
  queue.addChunk(eventMsg);
  callback();
};

queue.setInterval(chunk => {
  socket.emit('chunk', chunk);
});
