const express = require("express");
const { scrapeLogic } = require("./scrapeLogic");
const app = express();
const path = require('path');


const PORT = process.env.PORT || 4000;

app.get("/scrape", (req, res) => {
  scrapeLogic(res);
});
app.get('/screenshot', (req, res) => {
  const screenshotPath = path.join(__dirname, 'pagina_error.png');
  res.sendFile(screenshotPath);
});

app.get("/", (req, res) => {
  res.send("Render Puppeteer deu certo agora e so usar de exemplo para logica!");
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});