import { Options } from "selenium-webdriver/chrome";
import { database } from "../libs/database";
import { ISignRecord } from "../interfaces/signs";
import { isTodayRecordAbsent } from "../dal/zodiacdeep";
import { Signs_ZodiacDirBG } from "../utils/constants/signs";
import {
  Builder,
  Browser,
  By,
  Key,
  until,
  WebDriver,
} from "selenium-webdriver";
import { addSignDailyInfoIntoDB } from "../dal/zodiacdeep";
import { getDateShortString } from "../helpers/dateProcessing";
import { handleErrors } from "../utils/errors";

const { promise } = require("selenium-webdriver");
promise.USE_PROMISE_MANAGER = false;

export async function downloadLatestSignsData(): Promise<void> {
  const options = new Options();
  let driver = await new Builder()
    .forBrowser("chrome")
    .setChromeOptions(options.addArguments("--headless=new"))
    .build();

  try {
    for (const sign of Signs_ZodiacDirBG) {
      await getDailyInfo(
        `https://zodiac.dir.bg/sign/${sign}/dneven-horoskop`,
        driver,
        sign
      );
    }
  } catch (err) {
    console.log(err);
  } finally {
    console.log("QUIT DRIVER.");
    await driver.quit();
  }
}

/**
 * MAIN logic
 * Returns zodiac sign information from web address url
 * @param url web address to get zodiac sign information
 * @param driver WebDriver to open the url
 * @returns
 */
export async function getDailyInfo(
  url: string,
  driver: WebDriver,
  sign: string
): Promise<void> {
  try {
    await driver.get(url);
    const dateToShortString = getDateShortString();
    const isAbsent = await isTodayRecordAbsent(sign, dateToShortString);
    if (isAbsent) {
      await driver.wait(
        until.elementLocated(
          By.css("#content > .horoscope > #star_rating + p")
        ),
        10000
      );

      const signText = await driver.findElement(
        By.css("#content > .horoscope > #star_rating + p")
      );
      const content = await signText.getAttribute("innerText");

      if (signText) {
        await addSignDailyInfoIntoDB(sign, dateToShortString, content);
      }
    }
  } catch (err) {
    handleErrors(err);
  }
}
