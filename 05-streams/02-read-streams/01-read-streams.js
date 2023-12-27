const fs = require('fs/promises');

// ! Write a text-big.txt using write-1M-streams.js 
// ! Save it to this folder

(async () => {
  const fileHandleRead = await fs.open('text-big.txt', 'r');
  const stream = fileHandleRead.createReadStream();

  stream.on('data', (chunk) => {
    console.log(`Received ${chunk.length} bytes of data.`);
  });

  stream.on('end', (chunk) => {
    fileHandleRead.close();
    console.log("Reading Done");
  });
})();