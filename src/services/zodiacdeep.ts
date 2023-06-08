import { Options } from "selenium-webdriver/chrome";
import { database } from "../libs/database";
import {
  isTodayRecordAbsent,
  getTodaySignRecordFromDB,
  getTodayAllSignRecordsFromDB,
} from "../dal/zodiacdeep";
import { Signs_ZodiacDirBG } from "../models/signs";
import { mergeTextToFile } from "../helpers/files";
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

async function getWebDriver() : Promise<any> {
    const options = new Options();
    let driver = await new Builder()
      .forBrowser("chrome")
      .setChromeOptions(options.addArguments("--headless=new"))
      //.setChromeService()
      .build();
      return driver;
}

export async function downloadLatestSignsData(): Promise<void> {
    const options = new Options();
    let driver = await new Builder()
      .forBrowser("chrome")
      .setChromeOptions(options.addArguments("--headless=new"))
      .build();

  try {
    //let signResult = [{}];
    for (const sign of Signs_ZodiacDirBG) {
        // const options = new Options();
        // let driver = await new Builder()
        //   .forBrowser("chrome")
        //  // .setChromeOptions(options.addArguments("--headless=new"))
        //   .build();
        
      await getDailyInfo(
        `https://zodiac.dir.bg/sign/${sign}/dneven-horoskop`,
        driver,
        sign
      );
      //await driver.quit();
    }
  } catch (err) {
    console.log(err);
  } finally {
    console.log("QUIT DRIVER!");
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
async function getDailyInfo(
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
        until.elementLocated(By.css("#content > div.article-body.horoscope")),
        10000
      );

      const signText = await driver
        .findElement(By.css("#content > div.article-body.horoscope p"))
        .getText();

      if (signText) {
        // Add sign' information in the Google Cloud Firebase DB
        await addSignDailyInfoIntoDB(sign, dateToShortString, signText);
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
}

/**
 * rest service for one sign
 * @param sign / Zodiac
 * @returns sign / sidns' today data info
 */
export async function getSign(sign: string): Promise<string> {
  let todaySignInfo = SignsBGtexts.get("sign");
  if (todaySignInfo) return todaySignInfo;
  todaySignInfo = (await getTodaySignRecordFromDB(sign)).toString();
  return todaySignInfo;
}
