const fs = require('node:fs/promises');

// ! Write a 1-million.txt using write-1M-streams.js 
// ! Save file to /copy folder

// ! BAD PRACTICE 
// * File Size Copied: 100 GB
// * File Size Copied: 10 GB
// * Execution Time:  < 100ms
// setTimeout(() => {
//   (async () => {
//     console.time('copy');
//     const destFile = await fs.open('copy.txt', 'w')
//     const content = await fs.readFile('1-million.txt');
  
//     await destFile.write(content);
    
//     console.log("content: ", content.length);
//     console.timeEnd('copy');

//   })()
// }, 5000);

const READ_DEFAULT_BYTES = 16384;


// * File Size Copied: 100 GB
// * File Size Copied: 10 GB
// * Execution Time:  < 100ms
// * GOOD PRACTICE
setTimeout(() => {
  (async () => {
    console.time('copy');
    const destFile = await fs.open('copy.txt', 'w')
    const srcFile = await fs.open('1-million.txt', 'r')

    let bytesRead = -1;
    while(bytesRead !== 0) {
      const readResult = await srcFile.read();
      bytesRead = readResult.bytesRead;
      // console.log("bytesRead: ", bytesRead);

      // * Remove the extra zeros from file
      if(bytesRead != READ_DEFAULT_BYTES) {
        let zeroIndex = readResult.buffer.indexOf(0);
        const newBuffer = Buffer.alloc(zeroIndex);
        readResult.buffer.copy(newBuffer, 0, 0, zeroIndex);
        destFile.write(newBuffer);
      } 
      else {
        destFile.write(readResult.buffer);
      }
    }
    console.timeEnd('copy');
  })()
}, 5000);