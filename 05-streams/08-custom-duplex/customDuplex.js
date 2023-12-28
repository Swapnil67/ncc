const { Duplex } = require('node:stream');
const fs = require('node:fs');

// ! Write a text-big.txt using write-1M-streams.js 
// ! Save file to /copy folder

class DuplexStream extends Duplex {
  constructor({ readableHighWaterMark, writableHighWaterMark, readFileName, writeFileName }) {
    super({ readableHighWaterMark, writableHighWaterMark });  
    this.readFileName = readFileName; 
    this.writeFileName = writeFileName; 
    this.readFd = null;
    this.writeFd = null;
    this.chunks = [];
    this.chunksSize = 0;
  }

  _construct(callback) {
    fs.open(this.readFileName, 'r', (err, readFd) => {
      if(err) return callback(err);
      this.readFd = readFd;
      fs.open(this.writeFileName, 'w', (err, writeFd) => {
        if(err) return callback(err);
        this.writeFd = writeFd;
        callback();
      })
    })
  }


  // * The writable._write() method is prefixed with an underscore because 
  // * it is internal to the class that defines it, and should never be
  // * called directly by user programs.
  _write(chunk, encoding, callback) {
    // * Do write operation...
    this.chunks.push(chunk);
    this.chunksSize += chunk.length;
    
    // console.log('file Descriptor: ', this.writeFd);
    // console.log('current chunk size: ', chunk.length);
    // console.log("All chunks: ", this.chunks.length);
    // console.log("All chunksSize: ", this.chunksSize);
    // console.log("this.writableHighWaterMark: ", this.writableHighWaterMark);
    // console.log('----------------------------------------------------------------------');

    if(this.chunksSize > this.writableHighWaterMark) {
      fs.write(this.writeFd, Buffer.concat(this.chunks), (err) => {
        if(err) {
          return callback(err);
        }
        this.chunks = [];
        this.chunksSize = 0;
        callback();
      })
    } else {
      // * When we're done call the callback funtion
      callback();
    }
  }

  _read(size) {
    const buf = Buffer.alloc(size);
    fs.read(this.readFd, buf, 0, size, null, (err, bytesRead) => {
      if(err) return this.destroy(err);
      ++this.readsCount;
      // * null this to indicate the end of stream
      this.push(bytesRead > 0 ? buf.subarray(0, bytesRead) : null);
    })
  }

  // * This optional function will be called before the stream closes, delaying the 'finish' event until callback is called. 
  // * This is useful to close resources or write buffered data before a stream ends.
  _final(callback) {
    fs.write(this.writeFd, Buffer.concat(this.chunks), (err) => {
      ++this.writesCount;
      if(err) return callback(err);
      this.chunks = [];
      this.chunksSize = 0;
      callback();
    })
  }


  _destroy(err, callback) {
    if(this.readFd || this.writeFd) {
      fs.close(this.readFd, (er_rfd) => {
        if(er_rfd || err) {
          return callback(er_rfd || err)
        }
        fs.close(this.writeFd, (er_wfd) => {
          if(er_wfd || err) {
            return callback(er_wfd || err)
          }
        })
      })
    } else {
      callback(err);
    }
  }

}

const duplex = new DuplexStream({ readFileName: 'text-big.txt', writeFileName: 'write.txt' });

console.time('duplex');


duplex.on('data', (chunk) => {
  duplex.write(chunk, (err) => {
    if(err) {
      console.log(err);
    }
  })
})

duplex.on('end', (chunk) => {
  duplex.end();
  console.log("Reading Done");
})

duplex.on('finish', (chunk) => {
  console.timeEnd('duplex');
  console.log("Writing Done");
})

// * ------------------------------ OR ------------------------------

// duplex.on('data', (chunk) => {
//   if(!duplex.write(chunk)) {
//     duplex.pause();
//   }
// })

// duplex.on('end', (chunk) => {
//   duplex.end();
//   console.log("Reading Done");
// })

// duplex.on('drain', (chunk) => {
//   duplex.resume();
// })

// duplex.on('finish', (chunk) => {
//   console.timeEnd('duplex');
//   console.log("Writing Done");
// })


