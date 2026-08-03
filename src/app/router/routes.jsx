import { createBrowserRouter } from "react-router-dom";
import mainRoute from "./main.route";
import authRoute from "./auth.route";
import panelRoute from "./panel.route";

const router = createBrowserRouter([...mainRoute, ...authRoute, ...panelRoute]);

export default router;
