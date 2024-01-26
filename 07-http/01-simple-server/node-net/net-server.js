const net = require('node:net');

const server = net.createServer(socket => {

  socket.on('data', (chunk) => {
    console.log(chunk.toString('utf-8'));
  })

  const response = Buffer.from('Hii From Net Server', 'utf-8');
  socket.write(response)

  socket.on('end', (chunk) => {
    console.log("Connection Ended");
  })

})

server.listen(8050, '127.0.0.1', () => {
  console.log(`Server opened on `, server.address(), '\n');
})

