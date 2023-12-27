const { createGzip } = require('node:zlib');
const { pipeline } = require('node:stream');
const fs = require('fs');

// ! Write a text-big.txt using write-1M-streams.js 
// ! Save file to /copy folder

// * ------------ Create a gzip file using pipeline ------------

// * File Size Zipped: 1 GB
// * Execution Time: > 10s
// * MEMORY USAGE: 30MB
(async () => {
  console.time('pipline');
  const gzip = createGzip();

  const readStream = fs.createReadStream('text-big.txt');
  const writeGzip = fs.createWriteStream('text-big-txt.gz')

  pipeline(readStream, gzip, writeGzip, (err) => {
    console.log(err);
    console.timeEnd('pipline');
  });
})()  

// * ------------ Copying the file ------------
// * File Size Copied: 1 GB
// * Execution Time: < 500ms
// * MEMORY USAGE: 10MB
// (async () => {
//   console.time('pipline');

//   const readStream = fs.createReadStream('text-big.txt');
//   const writeStream = fs.createWriteStream('text-big-copy.txt')
//   pipeline(readStream, writeStream, (err) => {
//     console.log(err);
//     console.timeEnd('pipline');
//   });

// })()  