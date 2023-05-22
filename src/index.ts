import { app, startServer } from "./libs/rest";
import { setRoutes } from "./routes/index";

(async function (): Promise<void> {
  try {
    startServer();
    setRoutes(app);
  } catch (error) {
    console.log(error);
  }
})();
