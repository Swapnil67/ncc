console.log("A");

// * Pushed to Event Loop
setTimeout(() => {
  console.log("B");
}, 0);

// * Pushed to Event Loop
setTimeout(() => {
  console.log("C");
}, 1);

process.nextTick(() => {
  console.log("D");
});

console.log("E");

// * setImmediate() is designed to execute a script once the current poll phase completes.
// * setTimeout() schedules a script to be run after a minimum threshold in ms has elapsed.
