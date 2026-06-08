import { createBrowserRouter } from "react-router-dom";
import mainRoute from "./main.route";
import authRoute from "./auth.route";
import panelRoute from "./panel.route";

const token = JSON.parse(localStorage.getItem("token"));

const router = createBrowserRouter([
  ...mainRoute,
  ...authRoute,
  ...(token && panelRoute),
]);

export default router;
