// * ----------------------- Async/Await Promise Approach -------------------------

// * Execution Time: 10s
// * Using Promises
// * CPU Usage: 100% (One Core)
// * Memory Usage: 50MB
// setTimeout(() => {
//   (async () => {
//     const fs = require("fs/promises");
//     console.time('benchmark');
  
//     const fileHadler = await fs.open('file.txt', 'w');
//     for (let i = 0; i < 1000000; i++) {
//       await fileHadler.write(` ${i} `);
//     }
  
//     fileHadler.close();
//     console.timeEnd('benchmark');
//   })();
// }, 5000);

// * ----------------------- Callback Approach -------------------------

// * Execution Time: 2s
// * Using Callback
// * CPU Usage: 100% (One Core)
// setTimeout(() => {
//   (async () => {
//     const fs = require("node:fs");
//     console.time('benchmark');
  
//     fs.open('file.txt', 'w', (err, fd) => {
//       for (let i = 0; i < 1000000; i++) {
//         // * Pushes every write to a eventloop which fills the event loop
//         // * and leads to increase in memory usage
//         // * Data is not ordered (0,4,8,2,...,1M)
//         // * Because each callback can execute independently or other
//         // fs.write(fd, ` ${i} `, () => {}) // * 700 MiB

//         // * Synchronously writes 
//         // * Data is orderes (0,1,2,3,...,1M)
//         fs.writeSync(fd, ` ${i} `) // * 50 MiB
//       }
//       console.timeEnd('benchmark');
//     });
  
//   })();
// }, 5000);

// * ----------------------- Streams Approach -------------------------

// ! DON'T DO IT THIS WAY
// * Execution Time: 215ms 
// * Using Streams
// * CPU Usage: 100% (One Core)
// * Memory Usage: 50MB
setTimeout(() => {
  (async () => {
    const fs = require("fs/promises");
    console.time('benchmark');

    const fileHadler = await fs.open('file.txt', 'w+');
    const stream = fileHadler.createWriteStream();

    for (let i = 0; i < 1000000; i++) {
      const buff = Buffer.from(` ${i} `, 'utf-8');
      stream.write(buff)
    }

    console.timeEnd('benchmark');
  
  })();
}, 5000);