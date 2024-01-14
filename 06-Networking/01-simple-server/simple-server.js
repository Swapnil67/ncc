const net = require('net');

const server = net.createServer((socket) => {

  socket.on('data', (data) => {
    console.log('Chunk Raw ', data);
    console.log('Chunk text: ', data.toString('utf-8'));
  })

});

server.listen(3894, '127.0.0.1', () => {
  console.log(`Server opened on `, server.address());
})