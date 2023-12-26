const fs = require('fs/promises');

(async () => {
  const fileHandleRead = await fs.open('1-million.txt', 'r');
  const stream = fileHandleRead.createReadStream();

  stream.on('data', (chunk) => {
    console.log(`Received ${chunk.length} bytes of data.`);
  });

  stream.on('end', (chunk) => {
    fileHandleRead.close();
    console.log("Reading Done");
  });
})();