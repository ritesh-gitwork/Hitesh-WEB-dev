const http = require("http");

const hostname = "127.0.0.1";
const port = 3000;

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.statusCode = 200;
    res.setHeader("content-type", "text-plain");
    res.end("created a server successfully");
  } else if (req.url === "/new-page") {
    res.statusCode = 200;
    res.setHeader("content-type", "text-plain");
    res.end("visited new page successfuly successfully");
  } else {
    res.statusCode = 404;
    res.setHeader("content-type", "text-plain");
    res.end("404 error");
  }
});

server.listen(port, hostname, () => {
  console.log(`server is listening on http://${hostname}:${port}`);
});
