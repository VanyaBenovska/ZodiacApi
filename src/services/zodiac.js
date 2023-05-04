import { Builder, Browser, By, Key, until } from "selenium-webdriver";

export async function getZodiac(sign) {
  console.log(1);
  let driver = await initDriver();
  let result = {};
  console.log(2);
  const url = `https://zodiac.dir.bg/sign/${sign}/dneven-horoskop`;
  console.log(3);

  async function initDriver() {
    return await new Builder().forBrowser(Browser.SAFARI).build();
  }

  try {
    await driver.get(url);
    await driver.wait(
      until.elementLocated(By.xpath("//div[@class='article-body horoscope']")),
      10000
    );

    const textPromise = await driver //textPromise = await driver
      .findElement(By.xpath("//div[@class='article-body horoscope']"))
      .findElement(By.xpath("//p[]")); //.className("article-body horoscope")); //("section-title"))

    result = textPromise;

    console.log(result);
  } finally {
    await driver.quit();
  }

  return result;
}
