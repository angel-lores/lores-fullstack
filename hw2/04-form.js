const port = process.env.PORT || 5001;
const http = require("http");
const fs = require("fs");
const pathMod = require("path");
const querystring = require("querystring");
const formPath = pathMod.join(__dirname, "form.html");

const server = http.createServer((req, res) => {
  const path = (req.url || "").split("?")[0];

  if (req.method === "GET" && path === "/form") {
    fs.readFile(formPath, "utf8", (err, html) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
        res.end("Error loading form");
        return;
      }
      res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      res.end(html);
    });
    return;
  }

  if (req.method === "POST" && path === "/submit") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });
    req.on("end", () => {
      const data = querystring.parse(body);
      const name = data.name || "";
      const email = data.email || "";
      const comments = (data.comments || "").trim() || "n/a";
      const newsletter =
        data.newsletter === "yes"
          ? "Yes, sign me up for the newsletter."
          : "No, thank you.";

      res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      res.end(
        `Name: ${name}<br>` +
          `Email: ${email}<br>` +
          `Comments: ${comments}<br>` +
          `Newsletter: ${newsletter}`,
      );
    });
    return;
  }

  res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
  res.end("404 - page not found");
});

server.listen(port, () => console.log(`http://localhost:${port}/form`));
