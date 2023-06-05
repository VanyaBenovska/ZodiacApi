import { Options } from "selenium-webdriver/chrome";
import { database } from "../libs/database";
import { isTodayRecordAbsent, getTodayRecordFromDB } from "../dal/zodiacdeep";
import { SignsBGcollection } from "../models/signs";
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

async function convertMapToObject(): Promise<Record<string, string>> {
  let newObject: Record<string, string> = {};
  for (let [key, value] of SignsBGtexts) {
    newObject[key] = value;
  }
  return newObject;
}

const options = new Options();
export async function getZodiac(sign: string): Promise<Record<string, any>> {
  let driver = await new Builder()
    .forBrowser("chrome")
    .setChromeOptions(options.addArguments("--headless=new"))
    .build();

  //this.driver = new selenium.Builder().forBrowser("chrome").withCapabilities(capabilities).build();

  //     let driver = await env
  //   .builder()
  //   .setChromeOptions(options.addArguments('--headless=new'))
  //   .build();
  // await driver.get('https://selenium.dev');
  // await driver.quit();

  console.log(`DRIVER CHROME: ${driver}`);

  let result = {};

  try {
    // rest for one sign only
    if (sign) {
      const singleSignResult = await processSignInfo(
        `https://zodiac.dir.bg/sign/${sign}/dneven-horoskop`,
        driver,
        sign
      );
      mergeTextToTheObjectInSignFieldForRestResponse(sign, singleSignResult);
    } else {
      // rest for all signs
      let AllSignsResult = "";
      let signResult = "";
      for (const sign of SignsBGcollection) {
        signResult = await getDailyInfo(
          `https://zodiac.dir.bg/sign/${sign}/dneven-horoskop`,
          driver,
          sign
        );
        mergeTextToTheObjectInSignFieldForRestResponse(sign, signResult);
        // await mergeTextToFile(sign, signResult);
        AllSignsResult += "\r\n\r\n";
        AllSignsResult += signResult;
      }
      // Add all signs info into file
      // mergeTextToFile("AllSignsInfo", AllSignsResult);

      result = AllSignsResult;
    }
  } catch (err) {
    console.log(err);
  } finally {
    console.log("QUIT DRIVER!");
    await driver.quit();
  }
  return convertMapToObject();
}

function mergeTextToTheObjectInSignFieldForRestResponse(
  sign: string,
  signResult: string
): void {
  SignsBGtexts.set(sign, signResult);
}

/**
 * Returns JSON of string value result - the information get from the web site
 * Opens the web address, extracts the zodiac sign information, saves it into file and returns the information
 * @param url web address to get zodiac sign information
 * @param driver WebDriver to open the url
 * @param sign user zodiac sign, written as query in the user-interface
 * @param signResult zodiac sign information extracted from the url
 */
async function processSignInfo(
  url: string,
  driver: WebDriver,
  sign: string
): Promise<string> {
  return await getDailyInfo(url, driver, sign);
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
): Promise<string> {
  let result = "";
  try {
    await driver.get(url);

    const dateToShortString = getDateShortString();
    const isAbsent = await isTodayRecordAbsent(sign, dateToShortString);

    console.log("isAbsent:", isAbsent);

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

      // Write sign info into file
      mergeTextToFile(sign, signText);

      result = signText;
    } else {
      result = await getTodayRecordFromDB(sign);
    }
  } catch (error) {
    console.log(error);
  }
  return result;
}
