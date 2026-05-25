import { createBrowserRouter } from "react-router-dom";
import mainRoute from "./main.route";
import authRoute from "./auth.route";

const router = createBrowserRouter([...mainRoute, ...authRoute]);

export default router;
