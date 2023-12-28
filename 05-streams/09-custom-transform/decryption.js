const { Transform } = require("node:stream");
const fs = require("fs/promises");

// ! First run the encryption.js

/*
 * A Transform stream is a Duplex stream where the output is computed in some way from the input.
 * Examples include zlib streams or crypto streams that compress, encrypt, or decrypt data.
 */

class Decrypt extends Transform {
  _transform(chunk, encoding, callback) {
    // * Decrypting data
    for (let i = 0; i < chunk.length; i++) {
      if (chunk !== 255) {
        chunk[i] = chunk[i] - 1;
      }
    }

    this.push(chunk);
    callback();

    // * OR
    // callback(null, chunk)
  }
}

(async () => {
  try {
    console.time("decrypt");

    const readFileHandle = await fs.open("encrypted.txt", "r");
    const writeFileHandle = await fs.open("decrypted.txt", "w");

    const readStream = readFileHandle.createReadStream();
    const writeStream = writeFileHandle.createWriteStream();

    const decrypt = new Decrypt();

    // * Get the file stats
    const statResp = await readFileHandle.stat();
    const totalSize = statResp.size;

    readStream.pipe(decrypt).pipe(writeStream);

    let i = 0;
    readStream.on("data", (chunk) => {
      // * Encryption Percentage Calculation
      if (i % 1000 == 0) {
        let percent = parseFloat(readStream.bytesRead / totalSize) * 100;
        console.log(`Decryption Percentage: ${percent.toFixed(2)}%`);
      }
      ++i;
    });

    writeStream.on("finish", () => {
      console.log(`Decryption Percentage: 100.00`);
      console.timeEnd("decrypt");
    });

    writeStream.on("pipe", (chunk) => {
      console.log(chunk);
    });
  } catch (error) {
    console.log("Error Decryption ", error);
  }
})();
