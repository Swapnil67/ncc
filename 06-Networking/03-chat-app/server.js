const net = require('node:net');

const server = net.createServer();

// server.maxConnections = 1;

server.on('connection', (socket) => {

  // * socekt = net.Socket (Duplex Stream)


  console.log('A new connection to the server');
  // socket.write('Hii there');
  socket.on('data', (chunk) => {
    console.log(chunk.toString());
  })
})

server.listen(3008, "127.0.0.1", () => {
  console.log(`Listening on ${JSON.stringify(server.address())}`);
})