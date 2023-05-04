const puppeteer = require("puppeteer");
const fs = require("fs");
const express = require("express");
const app = express();
const { Builder, Browser, By, Key, until } = require("selenium-webdriver");

async function getZodiac() {
  let driver = await new Builder().forBrowser(Browser.SAFARI).build();
  let result = {};
  try {
    await driver.get("https://zodiac.dir.bg");
    const textPromise = await driver
      .findElement(By.className("site-title"))
      .getText();
    console.log(textPromise);
    result = textPromise;
  } finally {
    await driver.quit();
  }

  return result;
}

async function saveToFile(content) {
  fs.writeFile();
}

app.listen(3000, () => {
  console.log("Listening on port 3000");
});

app.get("/", async (req, res) => {
  const zodiacResult = await getZodiac();
  await saveToFile(zodiacResult);
  res.send(zodiacResult);
});

// async function start() {
//   console.log(await puppeteer.launch());
// }
