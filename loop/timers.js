// Non-guaranteed setTimeout

const fs = require('fs');

// Assume this takes at least 95ms
function asyncOp(callback) {
  fs.readFile('./text.txt', callback);
}

const timeoutScheduled = Date.now();

// This runs first, scheduling a callback after 100ms
setTimeout(() => {
  const delay = Date.now() - timeoutScheduled;

  console.log(`${delay}ms have passed since I was scheduled`);
}, 100);

// Do 'asyncOp', executing its callback
asyncOp(() => {
  const startCallback = Date.now();

  // Block for 10ms
  while (Date.now() - startCallback < 10) {
    // Do nothing
  }
})

process.nextTick(() => {
  console.log('First tick');

  process.nextTick(() => {
    console.log('Second tick');

    process.nextTick(() => {
      console.log('Third tick');
    })
  })
})
