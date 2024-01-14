const net = require('net');

const PORT = 3894;
const HOST = '127.0.0.1';
const socket = net.createConnection({ host: HOST, port: PORT }, () => {
  socket.write('A simple message from simple sender')
})