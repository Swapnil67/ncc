const fs = require('fs/promises');


// ! Write a text-big.txt using write-1M-streams.js 
// ! Save it to this folder

// ! DO NOT DO THIS WAY
// ! HIGH MEMORY USAGE
// (async () => {
//   console.time('benchmark');

//   const fileHandleRead = await fs.open('../text-big.txt', 'r');
//   const fileHandleWrite = await fs.open('text-big-dest.txt', 'w');

//   const readStream = fileHandleRead.createReadStream({ highWaterMark: 64 * 1024 });
//   const writeStream = fileHandleWrite.createWriteStream();

//   readStream.on('data', (chunk) => {
//     // console.log(`Received ${chunk.length} bytes of data.`);
//     writeStream.write(chunk);
//   });

//   readStream.on('end', (chunk) => {
//     fileHandleRead.close();
//     console.timeEnd('benchmark');
//     console.log("Reading Done");
//   });
// })();

// * GOOD PRACTICE
// * MINIMAL MEMORY USAGE
(async () => {
  console.time('benchmark');

  const fileHandleRead = await fs.open('../text-big.txt', 'r');
  const fileHandleWrite = await fs.open('text-big-dest.txt', 'w');

  const readStream = fileHandleRead.createReadStream({ highWaterMark: 64 * 1024 });
  const writeStream = fileHandleWrite.createWriteStream();

  let split = '';
  readStream.on('data', (chunk) => {
    // console.log(`Received ${chunk.length} bytes of data.`);

    const numbers = chunk.toString('utf-8').split("  ");

    // * ----------------------- For Splitting Issue -----------------------

    if(Number(numbers[0]) !== Number(numbers[1] - 1)) {
      if(split) {
        numbers[0] = split.trim() + numbers[0].trim();
      }
    }

    if(Number(numbers[numbers.length - 2] + 1) !== Number(numbers[numbers.length - 1])) {
      split = numbers.pop();
    }

    // * ----------------------- For Splitting Issue -----------------------


    numbers.forEach(n => {
      if(n % 2 == 0) {
        // * Even Numbers
      }
    })

    console.log("numbers: ", numbers);

    if(!writeStream.write(chunk)) {
      // * Pause the read stream once the write buffer gets full
      readStream.pause();
    }
  });

  readStream.on('end', (chunk) => {
    fileHandleRead.close();
    fileHandleWrite.close();
    console.log("Reading Done");
    console.timeEnd('benchmark');
  });

  writeStream.on('drain', () => {
    // * Resume the read stream once the write buffer gets empty
    readStream.resume();
  })

})();
