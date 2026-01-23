const express = require("express");
const app = express();
const port = process.env.PORT || 5001;

const routes = [
  "welcome",
  "redirect",
  "redirected",
  "cache",
  "cookie",
  "other",
];

app.get("/", (req, res) => {
  res.status(200);
  res.set({ "Content-Type": "text/html" });
  res.send("Express Routing Exercise");
});

// Add your code here
// http://localhost:5001/welcome should return a status code 200 with a welcome message of your choice in html format
app.get("/welcome", (req, res) => {
  res.status(200);
  res.set({ "Content-Type": "text/html" });
  res.send("<h1>Welcome!</h1><p>Express routing is working.</p>");
});

// http://localhost:5001/redirect should redirect the request to '/redirected' by using 302 as the status code / the redirected page should return a redirected message of your choice
app.get("/redirect", (req, res) => {
  // defaults to 302, but making it explicit is fine
  res.redirect(302, "/redirected");
});

// http://localhost:5001/redirected should return a redirected message of your choice
app.get("/redirected", (req, res) => {
  res.status(200);
  res.set({ "Content-Type": "text/html" });
  res.send("<h1>Redirected</h1><p>You made it to /redirected.</p>");
});

// http://localhost:5001/cache should return 'this resource was cached' in html format and set the cache max age to a day
app.get("/cache", (req, res) => {
  res.status(200);
  res.set({
    "Content-Type": "text/plain",
    "Cache-Control": "public, max-age=86400",
  });
  res.send("this resource was cached");
});

// http://localhost:5001/cookie should return 'cookies… yummm' in plain text and set 'hello=world' as a cookie
app.get("/cookie", (req, res) => {
  res.cookie("hello", "world"); // Express will set Set-Cookie
  res.status(200);
  res.type("text/plain");
  res.send("cookies... yummm");
});

// For other routes, such as http://localhost:5001/other, this exercise should return a status code 404 with '404 - page not found' in html format
app.use((req, res) => {
  res.status(404);
  res.set({ "Content-Type": "text/html" });
  res.send("<h1>404 - page not found</h1>");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
