const { Buffer, constants } = require("buffer");

const b = Buffer.alloc(1e9) // * 1 000 000 000 (1GB)

console.log("Buffer size: ", b.length);

// * 4 4GiB
console.log("How much buffer you can allocate by default: ", constants.MAX_LENGTH);


// * Note
/*
* 1 MB = 1000 * 1000 bytes
* 1 MiB = 1024 * 1024 bytes

* 1 GB = 1000 * 1000 * 1000 bytes
* 1 GiB = 1024 * 1024 * 1024 bytes
*/