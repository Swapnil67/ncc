const fs = require("fs/promises");

// ! Write a text-big.txt using write-1M-streams.js 

// * CPU USAGE: 100%
// * MEMORY USAGE: 50MB
setTimeout(() => {
(async () => {
  
  console.time('benchmark');

  const fileHandle = await fs.open('text-big.txt', 'w+');
  const stream = fileHandle.createWriteStream();
  

  let i = 0;
  const bytesToWrite = 100000000;
  const writeToStream = () => {
    while(i <= bytesToWrite) {
      let buff = Buffer.from(` ${i} `, 'utf-8');

      // * This is our last write
      if(i === bytesToWrite) {
        return stream.end();
      }

      // * If stream's buffer is full then break
      // * This calls the drain event
      if(!stream.write(buff)) break;
      
      // stream.write(buff); // ! Bad Practice

      i++;
    }
  }

  stream.on('drain', () => {
    // console.log(stream.writableLength);
    // * Empty the stream's buffer
    writeToStream();
  })

  stream.on('finish', () => {
    // * End the stream
    console.timeEnd('benchmark');
    fileHandle.close();
  })

  writeToStream();

})()
}, 5000);
