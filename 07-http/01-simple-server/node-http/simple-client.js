const http = require("node:http");

// * An Agent is responsible for managing connection persistence and reuse for HTTP clients
const agent = http.Agent({ keepAlive: true });

// * Request Options

const options = {
  agent: agent,
  hostname: "localhost",
  port: 8050,
  method: "POST",
  path: "/create-post",
  headers: {
    "Content-Type": "application/json",
    "name": "Swapnil"
  },
};

// * It represents an in-progress request whose header has already been queued.
const request = http.request(options);

// * This is emitted only once
request.on("response", (res) => {
  // console.log("Response ", res);

  console.log("------------ HEADERS: ------------");
  console.log(res.headers);

  console.log("------------ STATUS: ------------");
  console.log(res.statusCode);

  console.log("------------ BODY: ------------");
  res.on('data', (chunk) => {
    console.log("Response Data ", chunk.toString('utf-8'));
  })
});

request.end(JSON.stringify({ title: "Post 1!", body: "Post 1 Body!" }));

// request.write(JSON.stringify({ title: "Post 1!" }));
// request.end(JSON.stringify({ body: "Post 1 Body!" }));

// const request2 = http.request(options);
// request2.write(JSON.stringify({ title: "Post 2!" }));
// request2.end(JSON.stringify({ body: "Post 2 Body!" }));

// // * This is emitted only once
// request2.on("response", (res) => {
//   // console.log("Response ", res);

//   console.log("------------ HEADERS: ------------");
//   console.log(res.headers);

//   console.log("------------ STATUS: ------------");
//   console.log(res.statusCode);

//   console.log("------------ BODY: ------------");
//   res.on('data', (chunk) => {
//     console.log("Response Data ", chunk.toString('utf-8'));
//   })
// });

/*
 * Note 
 * You can either use Content-Length or Transfer Encoding
 * You cannot use both at same time
 */