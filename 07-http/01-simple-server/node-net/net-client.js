const net = require('net');


const PORT = 8050;
const HOST = '127.0.0.1';
const socket = net.createConnection({ host: HOST, port: PORT },() => {
  // const req = Buffer.from('Hii Server', 'utf-8');
  // socket.write(req);

  // * Real HTTP Request
  const headers = Buffer.from("504f5354202f6372656174652d706f737420485454502f312e310d0a436f6e74656e742d547970653a206170706c69636174696f6e2f6a736f6e0d0a6e616d653a20537761706e696c0d0a486f73743a206c6f63616c686f73743a383035300d0a436f6e6e656374696f6e3a206b6565702d616c6976650d0a436f6e74656e742d4c656e6774683a2034310d0a0d0a", 'hex');
  const body = Buffer.from('7b227469746c65223a22506f7374203121222c22626f6479223a22506f7374203120426f647921227d', 'hex');
  const req = Buffer.concat([headers, body]);
  socket.write(req);

})

socket.on('data', (chunk) => {
  console.log('RESPONSE RECEIVED:');
  console.log('Data: ', chunk.toString());
  socket.end();
})

socket.on('end', () => {
  console.log('Connection Closed');
})