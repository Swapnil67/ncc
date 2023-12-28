const { Readable } = require('node:stream');
const fs = require('node:fs');

class FileReadStream extends Readable {
  constructor({ highWaterMark, fileName }) {
    super({ highWaterMark });
    this.fileName = fileName;
    this.fd = null;
    this.readsCount = 0;
  }

  // * Runs immediately after the constructor
  // * It will put off all calling the other methods
  // * until we call the callback function
  _construct(callback) {
    fs.open(this.fileName, 'r', (err, fd) => {
      if(err) return callback(err);
      this.fd = fd;
      callback();
    })
  }

  _read(size) {
    const buf = Buffer.alloc(size);
    fs.read(this.fd, buf, 0, size, null, (err, bytesRead) => {
      if(err) return this.destroy(err);
      ++this.readsCount;
      // * null this to indicate the end of stream
      this.push(bytesRead > 0 ? buf.subarray(0, bytesRead) : null);
    })
  }

  _destroy(err, callback) {
    console.log('Number of reads: ', this.readsCount);

    if (this.fd) {
      fs.close(this.fd, (er) => callback(er || err));
    } else {
      callback(err);
    }
  }

}

const stream = new FileReadStream({ fileName: 'text-big.txt' })
stream.on('data', (chunk) => {
  // * For Data
  // console.log(chunk.toString('utf-8'));
  
  // * For Buffer Chunks
  console.log(chunk);
})

stream.on('end', () => {
  console.log("Stream done reading.");
})