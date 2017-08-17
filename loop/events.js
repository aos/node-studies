// Event emitter using process.nextTick() 
const EventEmitter = require('events');
const util = require('util');

function MyEmitter() {
  EventEmitter.call(this);

  // Use nextTick to emit the event once a handler is assigned
  // process.nextTick() will be called after the stack is cleared
  process.nextTick(() => {
    this.emit('event');
  })
}

util.inherits(MyEmitter, EventEmitter);

const myEmitter = new MyEmitter();

myEmitter.on('event', () => {
  console.log('an event occurred!');
})
