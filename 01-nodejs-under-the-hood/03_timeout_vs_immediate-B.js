// * However, if you move the two calls within an I/O cycle, the immediate callback is always executed first:

// * timeout_vs_immediate.js

const fs = require('fs');
fs.readFile("./02_event_loop.js", () => {
  setTimeout(() => {
    console.log('timeout');
  }, 0);
  setImmediate(() => {
    console.log('immediate');
  });
});

/*
  * The main advantage to using setImmediate() over setTimeout() is setImmediate() 
  * will always be executed before any timers if scheduled within an I/O cycle, independently of how many timers are present.
*/