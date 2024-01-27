const http = require("node:http");
const fs = require("node:fs/promises");

const server = http.createServer();

server.on('request', async (req, res) => {
  console.time('piping');
  // console.log("Url ", req.url);
  const url = req.url;
  const method = req.method;

  if(url == "/" && method == 'GET') {
    res.setHeader('Content-Type', 'text/html');
    const fileHandler = await fs.open('./public/index.html', 'r');
    const fileStream = fileHandler.createReadStream();
    fileStream.pipe(res);
    fileStream.on('end', () => {
      console.timeEnd('piping');
    })
  }
  else if(url == "/style.css" && method == 'GET') {
    res.setHeader('Content-Type', 'text/css');
    const fileHandler = await fs.open('./public/style.css', 'r');
    const fileStream = fileHandler.createReadStream();
    fileStream.pipe(res);
    fileStream.on('end', () => {
      console.timeEnd('piping');
    })
  }
  else if(url == "/index.js" && method == 'GET') {
    res.setHeader('Content-Type', 'text/javascript');
    const fileHandler = await fs.open('./public/index.js', 'r');
    const fileStream = fileHandler.createReadStream();
    fileStream.pipe(res);
    fileStream.on('end', () => {
      console.timeEnd('piping');
    })
  }
  else if(url == "/favicon.ico" && method == 'GET') {
    res.setHeader('Content-Type', 'image/x-icon');
    const fileHandler = await fs.open('./public/favicon.ico', 'r');
    const fileStream = fileHandler.createReadStream();
    fileStream.pipe(res);
    fileStream.on('end', () => {
      console.timeEnd('piping');
    })
  }
  else if(url == "/login" && method == 'POST') {
    res.setHeader('Content-Type', 'application/json');
    res.statusCode = 200;
    return res.end(JSON.stringify({ message: "Hello From Server" }))
  }
  else if(url == "/admin" && method == 'POST') {
    res.setHeader('Content-Type', 'application/json');
    res.statusCode = 401;
    return res.end(JSON.stringify({ message: "Unauthorized, Please login first!" }));
  }
  else if(url == "/upload" && method == 'PUT') {
    const fileHandler = await fs.open('./storage/image.png', 'w');
    const writeStream = fileHandler.createWriteStream();
    req.pipe(writeStream);
    req.on('end', () => {
      res.setHeader('Content-Type', 'application/json');
      return res.end(JSON.stringify({ message: "file uploaded!" }));
    })
  }
  else {
    return res.end(JSON.stringify({message: "Hello From Server"}))
  }

})

server.listen(9000, () => {
  console.log(`Web server listening on ${JSON.stringify(server.address())}`);
})