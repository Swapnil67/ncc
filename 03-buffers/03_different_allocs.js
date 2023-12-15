const { Buffer } = require("node:buffer");

// * Creates a zero-filled Buffer of length 1000.
const buffer = Buffer.alloc(1000);

// * Creates an uninitialized buffer of length 10.
// * This is faster than calling Buffer.alloc() but the returned
// * Buffer instance might contain old data that needs to be
// * overwritten using fill(), write(), or other functions that fill the Buffer's
// * contents.
const unsafeBuffer = Buffer.allocUnsafe(100);


console.log(unsafeBuffer.poolSize);

for (let i = 0; i < unsafeBuffer.length; i++) {
  const ubuffer = unsafeBuffer[i];
  if(ubuffer != 0) {
    console.log(`Element at position ${i} has value: ${ubuffer.toString()}`);
  };
}

