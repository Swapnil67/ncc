const { Transform } = require("node:stream");
const fs = require("fs/promises");

// ! Write a text-big.txt using write-1M-streams.js
// ! Save file to this folder

/*
 * A Transform stream is a Duplex stream where the output is computed in some way from the input.
 * Examples include zlib streams or crypto streams that compress, encrypt, or decrypt data.
 */

class Encrypt extends Transform {
  _transform(chunk, encoding, callback) {
    // * Encrypting data
    for (let i = 0; i < chunk.length; i++) {
      if (chunk !== 255) {
        chunk[i] = chunk[i] + 1;
      }
    }

    // * Push the data onto the readable queue.
    this.push(chunk);
    callback();

    // * OR
    // callback(null, chunk);
  }
}

(async () => {
  try {
    console.time("encrypt");
    const readFileHandle = await fs.open("text-big.txt", "r");
    // const readFileHandle = await fs.open('read.txt', 'r');
    const writeFileHandle = await fs.open("encrypted.txt", "w");

    const readStream = readFileHandle.createReadStream();
    const writeStream = writeFileHandle.createWriteStream();

    // * Encryption Object
    const encrypt = new Encrypt();

    // * Get the file stats
    const resp = await readFileHandle.stat();
    const totalSize = resp.size;

    readStream.pipe(encrypt).pipe(writeStream);

    let i = 0;
    readStream.on("data", (chunk) => {
      // * Encryption Percentage Calculation
      if (i % 1000 == 0) {
        let percent = parseFloat(readStream.bytesRead / totalSize) * 100;
        console.log(`Encryption Percentage: ${percent.toFixed(2)}%`);
      }
      ++i;
    });

    readStream.on("end", () => {
      // console.log('Reading Done');
    });

    writeStream.on("finish", () => {
      console.log(`Encryption Percentage: 100.00`);
      console.timeEnd("encrypt");
    });

    writeStream.on("pipe", (chunk) => {
      console.log(chunk);
    });
  } catch (error) {
    console.log("Error Encryption ", error);
  }
})();
