import { app, startServer } from "./libs/rest";
import { setRoutes } from "./routes/index";
import { handleErrors } from "./utils/errors";
import { downloadLatestSignsData } from "./services/zodiacdeep";

(async function (): Promise<void> {
  try {
    startServer();
    setRoutes(app);
    dailyDownloadLatestSignsData();
  } catch (error) {
    console.log(error);
  }
})();

export async function dailyDownloadLatestSignsData(): Promise<void> {
  try {
    //// zodiac?sign=leo

    // const now = new Date();
    // const currentHour = now.getUTCHours() + 3;
    // const targetHour = 8;
    // const targetMinute = 1;
    // const targetTime = new Date (now.getFullYear(), now.getMonth(), now.getDate(), targetHour, targetMinute);
    // let delay = targetTime.getTime() - now.getTime();

    // if (currentHour >= targetHour && now.getUTCMinutes() >= targetMinute) {
    //     delay += 24 * 60 * 60 * 1000;
    // }

    // async function a() {
    //   await downloadLatestSignsData()
    // }
    // setTimeout(a, delay);
    // setTimeout(async () => { await downloadLatestSignsData() }, delay);
    await downloadLatestSignsData();
  } catch (error) {
    handleErrors(error);
  }
}
