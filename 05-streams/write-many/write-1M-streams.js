const fs = require("fs/promises");

// ! Write a 1-million.txt using write-1M-streams.js 


setTimeout(() => {
(async () => {
  
  console.time('benchmark');

  const fileHandle = await fs.open('1-million.txt', 'w+');
  const stream = fileHandle.createWriteStream();
  
  let i = 0;
  const bytesToWrite = 1000000;
  const writeToStream = () => {
    while(i < bytesToWrite) {
      let buff = Buffer.from(` ${i} `, 'utf-8');

      // * This is our last write
      if(i == (bytesToWrite - 1)) {
        return stream.end();
      }

      // * If stream's buffer is full then break
      if(!stream.write(buff)) break;
      // stream.write(buff);

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
