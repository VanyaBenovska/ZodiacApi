import { database } from "../libs/database";
import {
  isTodayRecordAbsent,
  allSignsInformationDocumentAbsent,
} from "../dal/zodiacdeep";
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
import { getDateShortString } from "../dal/id-generator";

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

export async function getZodiac(sign: string): Promise<Record<string, any>> {
  let driver = await new Builder().forBrowser(Browser.SAFARI).build();
  let result = {};

  try {
    // rest for one sign only
    if (sign) {
      // TODO: check if sign' info is alredy added today
      await processSignInfo(
        `https://zodiac.dir.bg/sign/${sign}/dneven-horoskop`,
        driver,
        sign
      );
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
        await mergeTextToFile(sign, signResult);
        AllSignsResult += "\r\n\r\n";
        AllSignsResult += signResult;
      }
      // Add all signs info into file
      mergeTextToFile("AllSignsInfo", AllSignsResult);

      result = AllSignsResult;
    }
  } catch (err) {
    console.log(err);
  } finally {
    await driver.quit();
  }
  return convertMapToObject();
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
): Promise<Record<string, any>> {
  const signResult = await getDailyInfo(url, driver, sign);
  // Write sign info into file
  await mergeTextToFile(sign, signResult);
  return {
    sign: signResult,
  };
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
  let signText = "";
  try {
    await driver.get(url);

    const dateToShortString = getDateShortString();

    if (await isTodayRecordAbsent(sign, dateToShortString)) {
      await driver.wait(
        until.elementLocated(
          By.xpath("//div[@class='article-body horoscope']")
        ),
        10000
      );

      signText = await driver
        .findElement(By.xpath("/html/body/main/div[8]/div[1]/div[2]/p"))
        .getText();

      // Add sign' information in the Google Cloud Firebase DB
      await addSignDailyInfoIntoDB(sign, dateToShortString, signText);
    }
    result = signText;
  } catch (error) {
    console.log(error);
  }
  return result;
}
