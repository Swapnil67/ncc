// * Execution Time: 10s
// * Using Promises
// * 100% CPU (One Core)
// setTimeout(() => {
//   (async () => {
//   const fs = require("fs/promises");
//     console.time('benchmark');
  
//     const fileHadler = await fs.open('file.txt', 'w');
//     for (let i = 0; i < 1000000; i++) {
//       await fileHadler.write(` ${i} `);
//     }
  
//     fileHadler.close();
//     console.timeEnd('benchmark');
//   })();
// }, 5000);

// * Execution Time: 2s
// * Using Callback
// * 100% CPU (One Core)
setTimeout(() => {
  (async () => {
    const fs = require("node:fs");
    console.time('benchmark');
  
    fs.open('file.txt', 'w', (err, fd) => {
      for (let i = 0; i < 1000000; i++) {
        // fs.write(fd, ` ${i} `, () => {}) // * 700 MiB
        fs.writeSync(fd, ` ${i} `) // * 50 MiB
      }
      console.timeEnd('benchmark');
    });
  
  })();
}, 5000);

