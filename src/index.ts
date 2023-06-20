import { app, startServer } from "./libs/rest";
import { setRoutes } from "./routes/index";
import { handleErrors } from "./utils/errors";
import { downloadLatestSignsData } from "./services/zodiacdeep";

//// zodiac?sign=leo
//// http://localhost:3000/lucky?luckyText=lucky
// www -> http://localhost:3000/lucky?lucky=lucky

(async function (): Promise<void> {
  try {
    startServer();
    setRoutes(app);
    // Save today' all signs data into DB
    // dailyDownloadLatestSignsData();
    // dailyDownloadLatestSignsDataFORTESTS();
  } catch (error) {
    console.log(error);
  }
})();

export async function dailyDownloadLatestSignsData(): Promise<void> {
  try {
    const now = new Date();
    const currentHour = now.getUTCHours() + 3;
    const targetHour = 10;
    const targetMinute = 1;
    const targetTime = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      targetHour,
      targetMinute
    );
    let delay = targetTime.getTime() - now.getTime();

    if (currentHour >= targetHour && now.getUTCMinutes() >= targetMinute) {
      delay += 24 * 60 * 60 * 1000;
    }

    setTimeout(async () => {
      await downloadLatestSignsData();
    }, delay);
  } catch (error) {
    handleErrors(error);
  }
}

export async function dailyDownloadLatestSignsDataFORTESTS(): Promise<void> {
  try {
    await downloadLatestSignsData();
  } catch (error) {
    handleErrors(error);
  }
}
