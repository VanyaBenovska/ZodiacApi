import { app, startServer } from "./libs/rest";
import { setRoutes } from "./routes/index";

(async function () {
  try {
    console.log(1);
    startServer();
    setRoutes(app);
  } catch (error) {
    console.log(error);
  }
})();
