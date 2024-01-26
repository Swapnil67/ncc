const net = require('node:net');
const readline = require('node:readline/promises');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

// * socekt = net.Socket (Duplex Stream)
const socket = net.createConnection({ host: '127.0.0.1', port: 3008 }, async () => {
  console.log("Connected to the server");

  const message = await rl.question('Enter a message > ');
  socket.write(message);
})

socket.on('close', () => {
  console.log('Connection Closed');
}); 

socket.on('end', () => {
  console.log('disconnected from server');
}); 