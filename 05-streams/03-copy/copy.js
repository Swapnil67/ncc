const fs = require('node:fs/promises');

// ! Write a text-big.txt using write-1M-streams.js 
// ! Save file to /copy folder

// ! ------------------ BAD PRACTICE ------------------

// * Here we are copying by taking the complete data in one buffer
// * Then flushing the data to destination file

// * File Size Copied: 1 GB
// * Execution Time:  < 500ms
// * MEMORY USAGE: 1GB

// setTimeout(() => {
//   (async () => {
//     console.time('copy');
//     const destFile = await fs.open('copy.txt', 'w')
//     const content = await fs.readFile('text-big.txt');
  
//     await destFile.write(content);
    
//     console.log("content: ", content.length);
//     console.timeEnd('copy');

//   })()
// }, 5000);


// * ------------------ GOOD PRACTICE ------------------

// * File Size Copied: 1 GB
// * Execution Time:  > 1s
// * MEMORY USAGE: 10MB

const READ_DEFAULT_BYTES = 16384;
setTimeout(() => {
  (async () => {
    console.time('copy');
    const destFile = await fs.open('copy.txt', 'w')
    const srcFile = await fs.open('text-big.txt', 'r')

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

// * Here we are copying small small chunks of data in one buffer
// * Then flushing the buffer to destination file