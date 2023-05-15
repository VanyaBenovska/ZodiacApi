import { SignsBG } from "../models/signs";
import { mergeTextToFile, saveToFile } from "../helpers/files";

import {
  Builder,
  Browser,
  By,
  Key,
  until,
  WebDriver,
} from "selenium-webdriver";

export async function getZodiac(sign: string): Promise<string> {
  let result = "";
  let driver = await new Builder().forBrowser(Browser.SAFARI).build();

  console.log("DRIVER IS ON!");
  let url = "";

  let signResult;

  try {
    if (sign) {
      url = `https://zodiac.dir.bg/sign/${sign}/dneven-horoskop`;
      signResult = await GetDailyInfo(url, driver);
      await saveToFile(signResult, sign);
    } else {
      console.log("In FOREACH - beginning..");
      let AllSignsResult = "";
      for (const sign of SignsBG) {
        console.log(sign);
        url = `https://zodiac.dir.bg/sign/${sign}/dneven-horoskop`;
        console.log(`URL: ${url}`);
        signResult = await GetDailyInfo(url, driver);
        console.log(`SIGN RESULT: ${signResult}`);
        await mergeTextToFile(sign, signResult);
        AllSignsResult += signResult;
        AllSignsResult += "\r\n";
      }
      result = AllSignsResult;
    }
  } catch (err) {
    console.log(`ERROR in internal logic : ${err}`);
  } finally {
    await driver.quit();
    console.log("DRIVER QUIT");
  }
  return result;
}

async function GetDailyInfo(url: string, driver: WebDriver) {
  console.log(`GET DAILY INFO FROM url: ${url}`);
  let result = {};

  try {
    await driver.get(url);

    await driver.wait(
      until.elementLocated(By.xpath("//div[@class='article-body horoscope']")),
      10000
    );

    let textPromise = await driver
      .findElement(By.xpath("/html/body/main/div[8]/div[1]/div[2]/p"))
      .getText();

    result = textPromise;

    console.log(`DAILY INFO RESULT: ${result}`);
  } catch (error) {
    console.log(`ERROR: `);
    console.log(error);
  }
  return result;
}
