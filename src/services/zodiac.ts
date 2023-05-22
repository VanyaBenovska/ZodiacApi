import { database } from "../libs/database";
import { SignsBG } from "../models/signs";
import { mergeTextToFile } from "../helpers/files";
import {
  Builder,
  Browser,
  By,
  Key,
  until,
  WebDriver,
} from "selenium-webdriver";
import {
  addSignDailyInfoIntoDB,
  mergeSignDailyInfoIntoAllSignsInformation,
  createSignDailyInfoIntoAllSignsInformation,
} from "../dal/zodiac";
import { getDocumentNameByDate } from "../dal/id-generator";

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

export async function getZodiac(sign: string): Promise<Record<string, any>> {
  let driver = await new Builder().forBrowser(Browser.SAFARI).build();
  let result = {};

  try {
    // await addName("Vanya");

    if (sign) {
      result = await processSignInfo(
        `https://zodiac.dir.bg/sign/${sign}/dneven-horoskop`,
        driver,
        sign
      );
    } else {
      let AllSignsResult = "";
      let signResult = "";
      for (const sign of SignsBG) {
        signResult = await GetDailyInfo(
          `https://zodiac.dir.bg/sign/${sign}/dneven-horoskop`,
          driver,
          sign
        );
        await mergeTextToFile(sign, signResult);
        AllSignsResult += "\r\n\r\n";
        AllSignsResult += signResult;
      }
      mergeTextToFile("AllSignsInfo", AllSignsResult);
      result = AllSignsResult;
    }
  } catch (err) {
    console.log(err);
  } finally {
    await driver.quit();
  }
  return result;
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
  const signResult = await GetDailyInfo(url, driver, sign);
  await mergeTextToFile(sign, signResult);
  return {
    sign: signResult,
  };
}

/**
 * Returns zodiac sign information from web address url
 * @param url web address to get zodiac sign information
 * @param driver WebDriver to open the url
 * @returns
 */
async function GetDailyInfo(
  url: string,
  driver: WebDriver,
  sign: string
): Promise<string> {
  let result = "";
  try {
    await driver.get(url);

    await driver.wait(
      until.elementLocated(By.xpath("//div[@class='article-body horoscope']")),
      10000
    );

    let textPromise = await driver
      .findElement(By.xpath("/html/body/main/div[8]/div[1]/div[2]/p"))
      .getText();

    // Add sign' information in the map SignsBGtexts
    SignsBGtexts.set(sign, textPromise);

    if (await allSignsInformationDocumentAbsent()) {
      // Create document
      await createSignDailyInfoIntoAllSignsInformation();
    }

    // Add sign' information in the Google Cloud Firebase DB
    const documentId = getDocumentNameByDate();
    if (await recordAbsent(sign, documentId)) {
      // Add sign' information in the collection of sign' documents
      await addSignDailyInfoIntoDB(sign, documentId, textPromise);

      // Add sign' information in the AllSigns' documents
      await mergeSignDailyInfoIntoAllSignsInformation(textPromise);
    }

    result = textPromise;
  } catch (error) {
    console.log(error);
  }
  return result;
}

async function recordAbsent(sign: string, record: string): Promise<boolean> {
  const query = database.firestore(); // const db = getFirestore();
  const cityRef = query.collection(sign).doc(record);
  const doc = await cityRef.get();
  if (!doc.exists) {
    return true; // No such document!
  } else {
    return false; // Document present
  }
}

async function allSignsInformationDocumentAbsent(): Promise<boolean> {
  const query = database.firestore(); // const db = getFirestore();
  const cityRef = query
    .collection("allSignsInfo")
    .doc("allSignsInfoInOneString");
  const doc = await cityRef.get();
  if (!doc.exists) {
    return true; // No such document!
  } else {
    return false; // Document present
  }
}
