const fs = require("fs/promises");
const { Stream } = require("stream");

(async () => {
  const fileHadler = await fs.open('file.txt', 'w+');
  const stream = fileHadler.createWriteStream();

  console.log('-------------- Initial --------------');
  console.log('Total Stream Size: ', stream.writableHighWaterMark);
  console.log('Current length of stream: ', stream.writableLength);

  console.log('-------------- After Adding 16000 bits --------------');
  const buff = Buffer.alloc(16000, 'a');
  stream.write(buff);
  console.log('Total Stream Size: ', stream.writableHighWaterMark);
  console.log('Current length of stream: ', stream.writableLength);

  console.log('-------------- After Adding 383 more bits --------------');
  const buff2 = Buffer.alloc(383, 'a');
  stream.write(buff2);
  console.log('Total Stream Size: ', stream.writableHighWaterMark);
  console.log('Current length of stream: ', stream.writableLength);

  console.log('-------------- After Adding 1 more bits --------------');
  const buff3 = Buffer.alloc(1, 'a');
  stream.write(buff3);
  console.log('Total Stream Size: ', stream.writableHighWaterMark);
  console.log('Current length of stream: ', stream.writableLength);

  stream.on('drain', () => {
    console.log("=============== STREAM DRAIN ===============");
    console.log('Total Stream Size: ', stream.writableHighWaterMark);
    console.log('Current length of stream: ', stream.writableLength);
  })

})()