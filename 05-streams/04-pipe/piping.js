const fs = require("fs/promises");

// ! Write a text-big.txt using write-1M-streams.js 
// ! Save file to /copy folder

// * File Size Copied: 1 GB
// * Execution Time: < 500ms
// * MEMORY USAGE: 10MB

(async() => {
  console.time('piping');
  const srcFile = await fs.open('text-big.txt', 'r');
  const destFile = await fs.open('text-big-copy.txt', 'w');

  const readStream = srcFile.createReadStream();
  const writeStream = destFile.createWriteStream();

  // * The 'pipe' event is emitted when the stream.pipe() method is called
  // * on a readable stream.
  writeStream.on('pipe', () => {
    console.log('Something is piping into the file.');
  })

  readStream.pipe(writeStream);
  
  readStream.on('end', () => {
    console.timeEnd('piping');
  })

})()