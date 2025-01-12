const express = require("express");
const { scrapeLogic } = require("./scrapeLogic");
const app = express();
const path = require("path");
const fs = require("fs");


const PORT = process.env.PORT || 4000;

app.use("/public", express.static(path.join(__dirname, "public")));

app.get("/scrape", (req, res) => {
  scrapeLogic(res);
});
app.get('/screenshot', (req, res) => {
  res.send(`
    <h1>Screenshot Salva!</h1>
    <img src="/public/screenshots/screenshot.png" alt="Screenshot">
`);
});

app.get("/", (req, res) => {
  res.send("Render Puppeteer deu certo agora e so usar de exemplo para logica!");
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});