const { Transform, pipeline } = require('node:stream');
const fs = require('node:fs/promises');

class TransformStream extends Transform {

  constructor({ decodeStrings }) {
    super({ decodeStrings });
    this.data = '';
  }

  _transform(chunk, encoding, callback) {
    console.log("From _transform: ", typeof chunk);
    this.data = chunk;
    callback();
    // * OR
    // callback(null, chunk);
  }

  _flush() {
    JSON.parse(this.data);
    console.log("From _flush: ", JSON.parse(this.data));
    this.push(this.data);
  }

}

(async () => {
  const readFileHandle = await fs.open("object.json", "r");
  const writeFileHandle = await fs.open("valid-object.json", "w");

  const readStream = readFileHandle.createReadStream().setEncoding('utf-8');
  const writeStream = writeFileHandle.createWriteStream();

  const transform = new TransformStream({ decodeStrings: false });

  pipeline(readStream, transform, writeStream, (err) => {
    if(err) {
      console.log("Error ", err);
    }
  });
})()