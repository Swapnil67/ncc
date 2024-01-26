const http = require("http");

const server = http.createServer();

server.on("request", (req, res) => {
  console.log("------------ METHOD: ------------");
  console.log(req.method);

  console.log("------------ URL: ------------");
  console.log(req.url);

  console.log("------------ HEADERS: ------------");
  console.log(req.headers);
  const name = req.headers.name;

  let data = {}
  req.on('data', (chunk) => {
    console.log("Data: ", chunk.toString());
    Object.assign(data, JSON.parse(chunk.toString()))
  })

  req.on('end', () => {
    // console.log('Name: ', name);
    // console.log('Data: ', data);

    res.writeHead(200, {
      'Content-Type': 'application/json',
    })
    res.end(JSON.stringify({ message: `Hello ${name} your Post Created!` }));
  })

})

server.listen(8050, () => {
  console.log("Server listening on 8050");
})