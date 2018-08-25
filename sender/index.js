'use strict'

const Transform = require('stream').Transform
const PassThrough = require('stream').PassThrough

const transmit = require('./transmit')

const parseAndDelay = new Transform({
  objectMode: true,
  transform(chunk, encoding, callback) {
    if(chunk === '') return callback()
    try {
      // set the a delay between 0 and 1000 ms
      let delay = Math.round(Math.random() * 1000)
      setTimeout((() => callback(null, JSON.parse(chunk))), delay)
    } catch(e) {
      callback(`Can't parse: ${chunk}. ${e}`)
    }
  }
})

process.stdin
  .pipe(require('split')())
  .pipe(parseAndDelay)
  .pipe(new PassThrough({
    objectMode: true,
    transform: transmit
  }))
  .on('error', console .error)
  .on('finish', () => console.log('End of stream'))
