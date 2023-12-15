// * 0100 1000 0110 1001 0010 0001

const { Buffer } = require('buffer');

const myBuffer = Buffer.alloc(3);

myBuffer[0] = 0x48;
myBuffer[1] = 0x69;
myBuffer[2] = 0x21;

console.log("myBuffer ", myBuffer);
console.log("myBuffer ", myBuffer.toString('utf-8'));
