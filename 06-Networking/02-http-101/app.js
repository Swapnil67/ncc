const http = require('http');

const port = 4080;
const hostname = '192.168.1.1'; // * OR swapnilmac.local

const server = http.createServer((req, res) => {
  const data = { message: 'Hi there!' };
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Connection", "close");
  res.statusCode = 200;
  res.end(JSON.stringify(data));
})

server.listen(port, hostname, () => {
  console.log(`Server running on port ${port}`);
})