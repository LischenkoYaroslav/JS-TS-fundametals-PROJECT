const fs = require("fs");
const http = require("http");
const url = require("url");
const { getRequestBody } = require("./utils");

const PORT = 8000;
const router = async function (req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Request-Method", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  // const { query, pathname } = url.parse(req.url, true);

  if (req.method === "GET") {
    const users = await fs.promises.readFile(
      "./backend/testUser.json",
      "utf-8"
    );
    res.writeHead(200, { "Content-Type": "application/json" });
    res.write(users);
    return res.end();
  }
  if (req.method === "POST") {
    const usersText = await fs.promises.readFile(
      "./backend/testUser.json",
      "utf-8"
    );
    const users = JSON.parse(usersText);
    const newUserText = await getRequestBody(req);
    const newUser = JSON.parse(newUserText);
    const newUserId = users[users.length - 1].id + 1 || 1;
    users.push({ id: newUserId, ...newUser });
    const respText = JSON.stringify(users);
    await fs.promises.writeFile("./backend/testUser.json", respText);
    res.writeHead(200, { "Content-Type": "application/json" });
    res.write(respText);
    return res.end();
  }
  res.writeHead(404, "Not Found");
  res.end();
};

const server = http.createServer(router);
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
