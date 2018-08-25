'use strict';

// to manage the chunks of steaming to minimize the number of requests

class Queue {
  constructor() {
    this.chunk = [];
    this.interval = 2000;
  }

  addChunk(chunk) {
    this.chunk.push(chunk);
  }

  setInterval(callback) {
    this.interval = setInterval(() => {
      if (this.chunk.length == 0) {
        this.clearInterval();
        return;
      }

      // callback - which takes chunk and post to
      // receiver after mentioned interval
      callback(this.chunk);

      this.chunk = [];
    }, this.interval);
  }

  clearInterval() {
    clearInterval(this.interval);
  }
}

module.exports = Queue;
