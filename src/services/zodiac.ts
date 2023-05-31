import { database } from "../libs/database";
import {
  recordAbsent,
  allSignsInformationDocumentAbsent,
} from "../dal/zodiac";
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
import {
  addSignDailyInfoIntoDB,
  mergeSignDailyInfoIntoAllSignsInformation,
  createSignDailyInfoIntoAllSignsInformation,
} from "../dal/zodiac";
import { getDateShortString } from "../dal/id-generator";

//******************************************************************
// database.json  DB Zodiac
/*{
  "type": "service_account",
  "project_id": "zodiac-c3dc3",
  "private_key_id": "267ac83cff8284007c8b9bba0d4cea651170c683",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDVwgHDykuKtlGi\njCXMJKWem8G1tYXVVOsqBmb9c1Kq6SHHA7/4KD4P0gFnbcM3rrQJfBFXSx7HVLOz\nMrxFp6xFGBoZ6wibO+Q/N2wwqgrrPM4YuwGrczWSm3nkayPZNTuHfOEymNxhGQst\nSQAmteXiPkXfMsuLCi/jB8Y8b//lEXV4xnolaFDsZ/rzCAXif3cYgcouomJR9g6O\nKWO4EUsvOqu6wzBudzXQ9YJkiAyJWx+bC73RcqpBuKoltTI9ZGnxqvha4FmAJ/01\niqgXkExnQsCKhC0QFKI/JHSmzqRkxTqZQRMMZYu2fJwDuWITaVR/BOl3QSzZS+YH\na08ZGUcPAgMBAAECggEAGYQKD+QC9nDi98NA88hgGLnA+r7LVfbIB4EyJAjzEkG3\n7XiuHqI3Hk5UKpN4nRn2lbdAnqnx55tdxANHZA0qzCifXP6oTVdt3HnyKTDzErd0\nZpFUFrIu7+wtNa3wXoozK+4lN5P1ooWJxwMSyIwn/8StNIJst5EkvDX+XNKFukMO\nZ+eps1k0ZBbT2wxMjIBtQ55fxyPSK0eATkMLZOZz3l0gsLEWe9aZC7RQMnvCAGTq\nf33hr0vaduNRiXm1a5YmDjEsBMCOfXaOE6dScm6bCDHQkIZ3VqA0NSHzageLUrTq\nxhoosi9NwZhXl0vckc+B9vSsw2zBlA4KWJNQ0lyLIQKBgQDsddylMV2FTzkPQmyM\nwolbHgeUUmkzqSHqKGIKMLuYQ2M2asLAPwvnX3Z+nn2fxG/sX0COAzxiUGfOO7vH\nAfF6vr6EpysWkWwSWaLOmf8BB0kJwPJcyLqaB57JJI21lmOPo4huqWCw0Po7GJ5O\ngqWoqDvlLC3VuRI4c6ZBoH2AnwKBgQDna+PKctFwTesmqaHNVIy2f/ARv7N+mdoU\nLJkv+JCcFf2Dt4w6v9PdC3NvBFDlhA/8Rs8sXRmnxFwzSzjXaH3HGdEe2eDPJ4I9\ncpYzKZAzCObfc8QlyJgET8xWAGf2B6xkzIYfc1kncPnQrsfUtp+d4ib6A8C+q72C\njsYm+URzkQKBgQCkq8/lGuPOGsXZ4qBFxpRxaBBPMrUgzQBZWZYtEpMSDpvhIahO\nyZk4oDqdIzLJOLvZGNyUCZzburMP5Hl4tdm9aWi0aNaQ+OUSQmonBweXZ8Ntj3k5\nNHD/I59o5JPribf8KB6zMjGr8VzSGurkMge71K0hhArHdANEXQXDXkkIcQKBgAzF\nrpfAyIBbPIwwtoZfkTiNTRGds+lb0mZko7u7CzgiGpDHc4zWg3nipOdOpKxWIo+4\n1LxNExpoQvJtx2BUGwT/DsSWH8svEggUJ+gA9j1q01snx36SWJl8Ufm5IgO5HrGd\nfBWGRzhfCtqSmuLJhXuwPJh11pBvaBEpkhQak8WRAoGAfw0FM2+fgzYREr262fhU\nSpMg5JDjvSTFqrvnzkyPszfBwYYewXA9DsgAHio86b58TD559vsgtjX4h8m8/Dlg\n7MqLgZZW+kdFVGLkijGyyRDPNELG55qaJiac+OFCVCQ6tlr+ucTk8SmykSUciFtS\nlhidO36H6MWDJXY57cRdTpo=\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-o77c8@zodiac-c3dc3.iam.gserviceaccount.com",
  "client_id": "113490475191658526616",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-o77c8%40zodiac-c3dc3.iam.gserviceaccount.com",
  "universe_domain": "googleapis.com"
}
*/
//******************************************************************

//******************************************************************
// database.json  DB Zodiac2
/*{
    "type": "service_account",
    "project_id": "zodiac2-46afd",
    "private_key_id": "2b3884cb494980b04ba394d64b2a22e2d65aeec7",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDNHaSn3iuW+z4F\nhS1h4h4AzF2fb/IwbxrfLe3pFAYsJYUe4wy3VvHlje8sAz6HajiXP6uc/wbcFqQX\nQ+9QIplx/Jv2eDvbt1SQ3qQtNX/i0cJMO/6tSjbEuiRuTM2qJNa85MPvt0E6DfNW\ntYFMprtlymiz1RxiubK9A0Tt5fVj0Wf6ROWKofTMES6QA8hjujnv+pGcCZPlkVX7\nvj7vXzKrLGAqmr50SPVMK6nEfvnY0TopVeEOLctapRV1kMMxCFnZng2BYj2j4TO+\nbRyVu11HPqI/z0uKGrmSFes5IfsGyLhU2ojW7Yg07RfG9lMLkegUcIXWn9DsNGAF\nMawP4/qRAgMBAAECggEABnTRyV5pBxc4si4JWgjG6r3EDygUCqH+qap9j/37PUG/\nlVOug2lbUx9S+VLPUa4eYqVkipws7DnSt7BB3McABzpdMuaBNNbqFKbLamhiEoLJ\nf8KOL0h0HaBh0+57NUk0UK0PPVEKfrAwegjbzWy8npU+0zVIr9NaTNCI54ea4CXJ\nd81RZdBdqbqqaEOC0ZBeALGY1xD7mavcuMPX6w73Av3dRLP+6Z1h7G73b8vo+tCV\nhHhqFCvgW1p7WPXM/CaHA+ae3HXje0e88txGqMZeDf81wT6q825vKzyusCLlMMW5\n+Mao8q4Fah1+PIukknvfS19V6XMHD+5yVwJkt+CTgQKBgQDnBGJ12g/psncM/LZ7\n5s2vRH7/8CCr+xgpjOTgcXV/N4v9D8qUQx1yI3VROxcXpEX1gP9cK++6fcpq5T4P\nUyryzH/UylKYvGLOSqgNH1Oe63rq22CCYvO235qbtSicbR7S8q+IVjuGXIocb7py\nWPci4P+KRzvxhUCDIc7FpkNLQQKBgQDjTDDPkhJRU/sQ+G/dlL5OgWafiOeo5rVf\n6wxZ1bYw+5uD18hZBo1QFZF1R4s/m612cgWxmFzers10sla2KyVQCjNNIn/iEF9b\n1n5OY8WJaovDX5o+Fo2M1ClyIWn2yVPtayYWePlaK8ra8juJkI/Ym4dI/kuYLLPj\nKSHAQ+VrUQKBgGimW9P3TG4ZIkUH1cKa82IKLV3TcXl27aMk6CmkPA29I/UnSiWP\noa8q0OJTWkqjZ+2m2gbvAFIC2cdCwbI/gp0qdl32qSP3curwduA66K59DdmGN1nZ\naX3WHTub/SGfbO8ycMHaDmz3TrlDA7r5AjsSobAKROVL78V3cyul/aYBAoGAbGcy\nAE0SH2eGHhnegDcobBia8QtCMPOXHR/kzBN4yPO2v7JyAsN1MfSXYu+0IaoFmK/Y\nt1KLOEj2A+nqIQeCzCGRRgBmLVLRp+MsagZ7d4YxEgTOcz4eVEP7YEs/Vku+k0S+\n7YjUo4SvQqy0aG9hq1TBuLZPJ0xqnrRHPIMlL4ECgYBr9hyXfbzp+3QBwjGB+DV7\nm/57ZOBaxpOpqI9Tk0pIrHZsRasuKEE74NB1xv4IL2zBq2GJzFDA0xU1DEA4zimK\nUegnMqRBFwDM7Pa0GIeoOK9yuNQdvHZRLS37jIrd6aY3G3SdrMxbEDQzG4QDlYUJ\n4T/KTMusbaN9hQMG/GzVdA==\n-----END PRIVATE KEY-----\n",
    "client_email": "firebase-adminsdk-qtyrc@zodiac2-46afd.iam.gserviceaccount.com",
    "client_id": "110242178875269848529",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-qtyrc%40zodiac2-46afd.iam.gserviceaccount.com",
    "universe_domain": "googleapis.com"
  }
*/
//******************************************************************

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
    // rest for one sign only
    if (sign) {
      result = await processSignInfo(
        `https://zodiac.dir.bg/sign/${sign}/dneven-horoskop`,
        driver,
        sign
      );
    } else {
      // rest for all signs
      let AllSignsResult = "";
      let signResult = "";
      for (const sign of SignsBGcollection) {
        signResult = await GetDailyInfo(
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
 * MAIN logic
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
    const documentId = getDateShortString();
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
