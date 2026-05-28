import { QueryClientProvider } from "@tanstack/react-query";
import { Suspense, useState } from "react";
import { RouterProvider } from "react-router-dom";
import router from "./router/routes";
import { Bounce, ToastContainer } from "react-toastify";
import queryClient from "@/config/queryClient";
import ThemeContext from "./context/ThemeContext";

const AppProvider = () => {
  const [theme, setTheme] = useState(false);
  return (
    <Suspense fallback={<div>IsLoading</div>}>
      <QueryClientProvider client={queryClient}>
        <ThemeContext.Provider value={{ theme, setTheme }}>
          <div
            className={`${theme ? `dark` : `light`} bg-background-default max-w-480 mx-auto`}
          >
            <RouterProvider router={router} />
            <ToastContainer
              position="top-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={true}
              closeOnClick={false}
              rtl={true}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
              transition={Bounce}
            />
          </div>
        </ThemeContext.Provider>
      </QueryClientProvider>
    </Suspense>
  );
};

export default AppProvider;
