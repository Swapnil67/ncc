const { Buffer } = require("buffer");

// * 4 Bytes (32 bits) buffer
const memoryContainer = Buffer.alloc(4);

memoryContainer[0] = 0xf5;
memoryContainer[1] = 0x11;
memoryContainer[2] = 67;
memoryContainer[3] = -67;

console.log("memoryContainer ", memoryContainer);

console.log(memoryContainer[0]);
console.log(memoryContainer[1]);
console.log(memoryContainer[2]);
console.log(memoryContainer[3]);

console.log('My Buffer Size: ', memoryContainer.length);
console.log('My Buffer: ', memoryContainer.toString('hex'));

console.log('---------------------------------------------');

const buff1 = Buffer.from([0x48, 0x69, 0x21]);
console.log("My Buff1: ", buff1.toString('utf-8'));

// * Buffer out of Hex
const buff2 = Buffer.from("486921", 'hex');
console.log("My Buff2: ", buff2.toString('utf-8'))

// * Buffer out of String
const buff3 = Buffer.from("Hi!", 'utf-8');
console.log("My Buff3: ", buff3);

// * filled with bytes which all have the value `1`.
const Buff4 = Buffer.alloc(10, 1);
console.log("My Buff4: ", buff4);
