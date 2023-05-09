import { Builder, Browser, By, Key, until } from "selenium-webdriver";

export async function getZodiac(sign) {
  const driver = await new Builder().forBrowser(Browser.SAFARI).build();

  const url = `https://zodiac.dir.bg/sign/${sign}/dneven-horoskop`;
  let result = {};

  try {
    await driver.get(url);
    console.log(1);

    await driver.wait(
      until.elementLocated(By.xpath("//div[@class='article-body horoscope']")),
      10000
    );
    console.log(2);

    // CSS
    // List <WebElement> listItems;
    // let listItems = driver.findElements(By.cssSelector("p"));

    const textPromise = await driver
      .findElement(By.xpath("/html/body/main/div[8]/div[1]/div[2]/p"))
      .getText();

    result = textPromise;

    console.log(result);
  } catch (error) {
    console.log(error);
    console.log(3);
  } finally {
    await driver.quit();
    console.log(4, "\r\nDriver quit.");
  }

  return result;
}
