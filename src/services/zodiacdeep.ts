import { Options } from "selenium-webdriver/chrome";
import { database } from "../libs/database";
import { ISignRecord } from "../interfaces/signs";
import {
  isTodayRecordAbsent,
  GetLastElementJSNatFromSignData,
} from "../dal/zodiacdeep";
import { Signs_ZodiacDirBG } from "../models/signs";
import {
  Builder,
  Browser,
  By,
  Key,
  until,
  WebDriver,
} from "selenium-webdriver";
import { addSignDailyInfoIntoDB } from "../dal/zodiacdeep";
import { getDateShortString } from "../helpers/id-generator";

const { promise } = require("selenium-webdriver");
promise.USE_PROMISE_MANAGER = false;

// https://zodiac.dir.bg
export const SignsBGtexts = new Map<string, string>([
  ["oven", ""],
  ["telets", ""],
  ["bliznatsi", ""],
  ["rak", ""],
  ["lav", ""],
  ["deva", ""],
  ["vezni", ""],
  ["skorpion", ""],
  ["strelets", ""],
  ["kozirog", ""],
  ["vodoley", ""],
  ["ribi", ""],
]);

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
): Promise<string> {
  let testResult = "";
  try {
    await driver.get(url);
    const dateToShortString = getDateShortString();
    const isAbsent = await isTodayRecordAbsent(sign, dateToShortString);
    console.log("Is data absent in DB: " + isAbsent);
    if (isAbsent) {
      await driver.wait(
        until.elementLocated(
          By.css("#content > .horoscope > #star_rating + p")
        ), // "#content > div.article-body.horoscope")),
        10000
      );

      const signText = await driver.findElement(
        By.css("#content > .horoscope > #star_rating + p")
      );
      const content = await signText.getAttribute("innerText");

      //"#content > div.article-body.horoscope p"))
      if (signText) {
        await addSignDailyInfoIntoDB(sign, dateToShortString, content);
       
      } else {
        console.log(
          `TODO: Daily data's not extracted from the web site! signText: ${signText}`
        );
      }
    } else {
      console.log("Today Record Absent in DB! isAbsent:", isAbsent);
    }
  } catch (error) {
    console.log(error);
  }
  return testResult;
}
