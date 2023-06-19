import { app, startServer } from "./libs/rest";
import { setRoutes } from "./routes/index";
import { handleErrors } from "./utils/errors";
import { downloadLatestSignsData } from "./services/zodiacdeep";

(async function (): Promise<void> {
  try {
    startServer();
    setRoutes(app);
    // Save today' all signs data into DB
    dailyDownloadLatestSignsData();
  } catch (error) {
    console.log(error);
  }
})();

export async function dailyDownloadLatestSignsData(): Promise<void> {
  try {
    //// zodiac?sign=leo
    //// http://localhost:3000/lucky?luckyText=lucky
   

    await downloadLatestSignsData();
  } catch (error) {
    handleErrors(error);
  }
}
