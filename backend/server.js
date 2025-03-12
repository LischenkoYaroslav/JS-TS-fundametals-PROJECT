const fs = require("fs");
const http = require("http");
const url = require("url");
const { getRequestBody } = require("./utils");

const PORT = 8080;
const router = async function (req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Request-Method", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  const { pathname } = url.parse(req.url, true);
  console.log(pathname);

  if (pathname === "/") {
    if (req.method === "GET") {
      const lamps = await fs.promises.readFile(
        "./backend/database/lamps.json",
        "utf-8"
      );
      res.writeHead(200, { "Content-Type": "application/json" });
      res.write(lamps);
      return res.end();
    }
  }

  if (pathname === "/lamps") {
    if (req.method === "GET") {
      const lamps = await fs.promises.readFile(
        "./backend/database/lamps.json",
        "utf-8"
      );
      res.writeHead(200, { "Content-Type": "application/json" });
      res.write(lamps);
      return res.end();
    }
    if (req.method === "POST") {
      const updatedLamps = await getRequestBody(req);
      await fs.promises.writeFile(
        "./backend/database/lamps.json",
        updatedLamps
      );
      console.log("Updated Lamps", JSON.parse(updatedLamps));
      return res.end();
    }
  }
  res.writeHead(404, "Not Found");
  res.end();
};

const server = http.createServer(router);
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
