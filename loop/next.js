// process.nextTick()
let bar;

// Not an actual async call
function someSyncApiCall(callback) {
  process.nextTick(callback);
}

someSyncApiCall(() => {
  console.log('bar', bar);
});

// This only works because process.nextTick() allows the stack to unwind
// before calling the callback on someSyncApiCall();
bar = 1;
