const http = require("http");
const port = process.env.PORT || 5001;

const routes = {
  // http://localhost:5001/welcome should return a status code 200 with a welcome message of your choice in html format
  "/welcome": (req, res) => {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end("<h1>Welcome!</h1><p>Node routing is working.</p>");
  },

  // http://localhost:5001/redirect should redirect the request to '/redirected' by using 302 as the status code / the redirected page should return a redirected message of your choice
  "/redirect": (req, res) => {
    res.writeHead(302, { Location: "/redirected" });
    res.end();
  },

  // http://localhost:5001/redirected should return a redirected message of your choice
  "/redirected": (req, res) => {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end("<h1>Redirected</h1><p>You made it to /redirected.</p>");
  },

  // http://localhost:5001/cache should return 'this resource was cached' in html format and set the cache max age to a day
  "/cache": (req, res) => {
    res.writeHead(200, {
      "Content-Type": "text/html",
      "Cache-Control": "public, max-age=86400",
    });
    res.end("this resource was cached");
  },

  // http://localhost:5001/cookie should return 'cookies… yummm' in plain text and set 'hello=world' as a cookie
  "/cookie": (req, res) => {
    res.writeHead(200, {
      "Content-Type": "text/plain",
      "Set-Cookie": "hello=world; Path=/",
    });
    res.end("cookies... yummm");
  },
};
const server = http.createServer((req, res) => {
  const path = (req.url || "/").split("?")[0];
  if (routes[path]) {
    routes[path](req, res);
    return;
  }
  res.writeHead(404, { "Content-Type": "text/html" });
  // For other routes, such as http://localhost:5001/other, this exercise should return a status code 404 with '404 - page not found' in html format
  res.end("<h1>404 - page not found</h1>");
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
