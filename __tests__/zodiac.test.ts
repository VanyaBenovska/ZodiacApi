import { Builder, By, WebDriver, until } from "selenium-webdriver";
import { Options } from "selenium-webdriver/chrome";
import { GetLastElementJSNatFromSignData } from "../src/dal/zodiacdeep";

describe("GetLastElementJSNatFromSignData", () => {
  const sampleSign = "oven";
  const wrongSign = "delfin";
  test("should return ISignRecord", async () => {
    const result = await GetLastElementJSNatFromSignData(sampleSign);
    expect(result).toBeDefined();
    expect(
      typeof result !== "undefined" && result.sign === sampleSign
    ).toStrictEqual(true);
  });
  test("should return empty object", async () => {
    const result = await GetLastElementJSNatFromSignData(wrongSign);
    expect(result && result.sign === wrongSign).toStrictEqual(true);
    expect(result && result.createdAt === "").toStrictEqual(true);
    expect(result && result.text === "").toStrictEqual(true);
  });
});

describe("getDailyInfo", () => {
  const sampleSign = "oven";
  const testUrl = `https://zodiac.dir.bg/sign/${sampleSign}/dneven-horoskop`;
  let testDriver: any;
  beforeAll(async () => {
    const options = new Options();
    testDriver = await new Builder()
      .forBrowser("chrome")
      .setChromeOptions(options.addArguments("--headless=new"))
      .build();
  });
  test("should return sign info", async () => {
    await testDriver.get(testUrl);
    await testDriver.wait(
      until.elementLocated(By.css("#content > .horoscope > #star_rating + p")), // "#content > div.article-body.horoscope")),
      10000
    );
    const signText = await testDriver.findElement(
      By.css("#content > .horoscope > #star_rating + p")
    );
    const signResult = await signText.getAttribute("innerText");

    expect(signResult).toBeDefined();
    expect(typeof signResult === typeof "string").toStrictEqual(true);
    expect(signResult.text !== "").toStrictEqual(true);
  });

  afterAll(() => {
    testDriver.quit();
  });
});
