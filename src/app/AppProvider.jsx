import { QueryClientProvider } from "@tanstack/react-query";
import { Suspense, useState } from "react";
import { RouterProvider } from "react-router-dom";
import router from "./router/routes";
import { Bounce, ToastContainer } from "react-toastify";
import queryClient from "@/config/queryClient";
import ThemeContext from "./context/ThemeContext";
import { Provider } from "react-redux";
import store from "./store/store";
import { useI18n } from "@/i18n/useI18n";

const AppProvider = () => {
  const { lang } = useI18n();
  const [theme, setTheme] = useState(false);
  return (
    <Suspense fallback={<div>IsLoading</div>}>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <ThemeContext.Provider value={{ theme, setTheme }}>
            <div
              dir={lang === "en" ? "ltr" : "rtl"}
              className={`${theme ? `dark` : `light`} bg-background-default max-w-480 mx-auto`}
            >
              <RouterProvider router={router} />
              <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                closeOnClick={false}
                rtl={true}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme={theme ? `dark` : "light"}
                fontFamily="vazir"
                transition={Bounce}
                stacked
                toastStyle={{
                  fontFamily: "IRANYekanXFaNum",
                }}
              />
            </div>
          </ThemeContext.Provider>
        </QueryClientProvider>
      </Provider>
    </Suspense>
  );
};

export default AppProvider;
