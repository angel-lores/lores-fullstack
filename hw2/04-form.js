const port = process.env.PORT || 5001;
const http = require("http");
const querystring = require("querystring");

const server = http.createServer((req, res) => {
  const path = (req.url || "").split("?")[0];

  if (req.method === "GET" && path === "/form") {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.end(`
      <form method="POST" action="/submit">
        Name: <input name="name"><br>
        Email: <input name="email"><br>
        Comments: <input name="comments"><br>
        Newsletter:
          <input type="radio" name="newsletter" value="yes"> Yes
          <input type="radio" name="newsletter" value="no" checked> No
        <br>
        <button type="submit">Submit</button>
      </form>
    `);
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
