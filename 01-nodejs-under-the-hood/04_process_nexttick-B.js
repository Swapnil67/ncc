let bar;

function someAsyncApiCall(callback) {
  process.nextTick(callback);
}

someAsyncApiCall(() => {
  console.log('bar: ', bar); // 1
});
bar = 1;

/*
  * By placing the callback in a process.nextTick(), the script still has the ability to run to completion, 
  * allowing all the variables, functions, etc., to be initialized prior to the callback being called.
  * It also has the advantage of not allowing the event loop to continue. It may be useful for the user to be alerted
  * to an error before the event loop is allowed to continue. Here is the previous example using process.nextTick():
*/