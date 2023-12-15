
/*
  * if we run the following script which is not within an I/O cycle (i.e. the main module), 
  * the order in which the two timers are executed is non-deterministic, as it is bound by the performance of the process:
*/

setTimeout(() => {
  console.log('timeout');
}, 0);

setImmediate(() => {
  console.log('immediate');
});
