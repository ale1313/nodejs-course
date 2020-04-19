// CORE MODULES
const http = require("http");
const fs = require("fs");

// LOCAL MODULES
const { info, error } = require("./modules/my-log");
// const log = require("./modules/my-log");       Another way of importing

const port = 4000;

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write("<html><body><p>Home Page</p></body></html>");
    res.end();
  } else if (req.url === "/exit") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write("<html><body><p>Bye</p></body></html>");
    res.end();
  } else if (req.url === "/info") {
    const result = info(req.url);
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(result);
    res.end();
  } else if (req.url === "/error") {
    const result = error(req.url);
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(result);
    res.end();
  } else {
    res.writeHead(404, { "Content-Type": "text/html" });
    res.write("<html><body><p>Not found</p></body></html>");
    res.end();
  }
});

server.listen(port);
console.log(`Running on port ${port}`);
