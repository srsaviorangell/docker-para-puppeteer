const puppeteer = require("puppeteer");
const fs = require("fs");
require("dotenv").config();
const path = require("path");
const fs = require("fs");


const url = "https://www.sofascore.com/pt/";

const seletores = {
  contgeral:'.Box.klGMtt ',
  separdor:'.HorizontalDivider.gqlAIl',
  ContCampenalto:'.Box.klGMtt >.Box.Flex.cBIkhT.jLRkRA',
  nomePais: 'Box.Flex.eHnLBZ.kkrevz > a > .Text.cbiYVh',
  contPaisOuLiga:'.Box.klGMtt >.Box.Flex.cBIkhT.jLRkRA > .Box.Flex.dOBJED.hURKmT',
  paisOuLiga: '.Box.Flex.dOBJED.hURKmT .Text.bZlPcX', 
  imgPais: '.Box.Flex.cBIkhT.jLRkRA img.Img.ccYJkt, .Box.Flex.cBIkhT.jLRkRA img.Img.kMzyHA, .Box.Flex.cBIkhT.jLRkRA img.Img.ccYJkt ',

  contHorarioTempo:'.Box.jKVshf',
  horario: '.Text.kcRyBI',
  tempo: '.Box.Flex.jTiCHC.cRYpNI.sc-efac74ba-2.gxmYGv.score-box .Text.fjeMtb.currentScore bdi',

  ContJogos:'.Box.dtLxRI',
  nomeH1: '[data-testid="left_team"] .Text.ezSveL',
  escudoH1: '[data-testid="left_team"] .Img.jbaYme',
  nomeH2: '[data-testid="right_team"] .Text.ezSveL',
  escudoH2: '[data-testid="right_team"] .Img.jbaYme',

  contPlacar: '.Box.Flex.gulcjH.yaNbA',
  placarH1: '[data-testid="left_score"] .Text.cvwZXc.currentScore',
  placarH2: '[data-testid="right_score"] .Text.cvwZXc.currentScore'
};
const scrapeLogic = async (res) => {
  const browser = await puppeteer.launch({
    args: [
      "--disable-setuid-sandbox",
      "--no-sandbox",
      "--single-process",
      "--no-zygote",
    ],
    executablePath:
      process.env.NODE_ENV === "production"
        ? process.env.PUPPETEER_EXECUTABLE_PATH
        : puppeteer.executablePath(),
  });
  try {
    const page = await browser.newPage();

    await page.goto(url, { timeout: 50000});

    const aoVivo = '.Chip.elpdkn';
    await page.waitForSelector(aoVivo, { visible: true });

    await page.evaluate((selector) => {
        const button = document.querySelector(selector);
        if (button) {
            button.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
        }
    }, aoVivo);
    console.log('click ok');

    const outputDir = path.resolve(__dirname, "public/screenshots");
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true }); // Cria a pasta, se não existir
}

await page.screenshot({
    path: path.join(outputDir, "screenshot.png"),});



    await page.screenshot({ path: 'pagina_error.png' });
    console.log('Screenshot tirado e salvo como "pagina_error.png".');
    res.send('Screenshot tirado e salvo como "pagina_error.png".');

  } catch (e) {
    console.error(e);
    res.send(`Something went wrong while running Puppeteer: ${e}`);
  } finally {
    await browser.close();
  }
};

module.exports = { scrapeLogic };