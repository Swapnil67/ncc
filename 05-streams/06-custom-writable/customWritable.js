const fs = require('node:fs');
const { Writable } = require('node:stream');

class FileWriteStream extends Writable {
  constructor({ highWaterMark, fileName }) {
    super({ highWaterMark })
    this.fileName = fileName;
    this.fd = null;
    this.chunks = [];
    this.chunksSize = 0;
    this.writesCount = 0;
  }

  // * Runs immediately after the constructor
  // * It will put off all calling the other methods
  // * until we call the callback function
  _construct(callback) {
    fs.open(this.fileName, 'w', (err, fd) => {
      if(err) {
        // * So if we call the callback with arguments, means we have an err
        // * and we should not proceed.
        callback(err);
      }
      else {
        this.fd = fd;
        callback();
      }
    })
  }

  // * The writable._write() method is prefixed with an underscore because 
  // * it is internal to the class that defines it, and should never be
  // * called directly by user programs.
  _write(chunk, encoding, callback) {
    // * Do write operation...
    this.chunks.push(chunk);
    this.chunksSize += chunk.length;
    
    // console.log('file Descriptor: ', this.fd);
    // console.log('current chunk size: ', chunk.length);
    // console.log("All chunks: ", this.chunks.length);
    // console.log("All chunksSize: ", this.chunksSize);
    // console.log("this.writableHighWaterMark: ", this.writableHighWaterMark);
    // console.log('----------------------------------------------------------------------');

    if(this.chunksSize > this.writableHighWaterMark) {
      fs.write(this.fd, Buffer.concat(this.chunks), (err) => {
        if(err) {
          return callback(err);
        }
        this.chunks = [];
        this.chunksSize = 0;
        ++this.writesCount;
        callback();
      })
    } else {
      // * When we're done call the callback funtion
      callback();
    }
  }

  // * This optional function will be called before the stream closes, delaying the 'finish' event until callback is called. 
  // * This is useful to close resources or write buffered data before a stream ends.
  _final(callback) {
    fs.write(this.fd, Buffer.concat(this.chunks), (err) => {
      ++this.writesCount;
      if(err) return callback(err);
      this.chunks = [];
      this.chunksSize = 0;
      callback();
    })
  }

  _destroy(err, callback) {
    console.log('Number of writes: ', this.writesCount);
    if(this.fd) {
      fs.close(this.fd, (er) => {
        callback(er || err)
      })
    } else {
      callback(err);
    }
  }

}

// const stream = new FileWriteStream({
//   highWaterMark: 1800,
//   fileName: "test.txt",
// });

// stream.write(Buffer.from('NodeJS is awesome'));
// stream.end(Buffer.from('\nStream Ended'));
// stream.on('finish', () => {
//   console.log("Stream Finished");
// })

(async () => {
  
  console.time('benchmark');

  const stream = new FileWriteStream({
    // highWaterMark: 1800,
    fileName: "test.txt",
  });
  
  let i = 0;
  const bytesToWrite = 1000000;
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

  let d = 0;
  stream.on('drain', () => {
    ++d;
    // * Empty the stream's buffer
    writeToStream();
  })

  stream.on('finish', () => {
    // * End the stream
    console.log("Number of drains: ", d);
    console.timeEnd('benchmark');
  })

  writeToStream();

})()