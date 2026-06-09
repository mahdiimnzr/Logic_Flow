import { QueryClientProvider } from "@tanstack/react-query";
import { Suspense, useEffect, useState } from "react";
import { RouterProvider } from "react-router-dom";
import router from "./router/routes";
import { Bounce, ToastContainer } from "react-toastify";
import queryClient from "@/config/queryClient";
import ThemeContext from "./context/ThemeContext";
import { Provider } from "react-redux";
import store from "./store/store";
import { useI18n } from "@/i18n/useI18n";
import LoadingSvg from "@/core/icons/LoadingSvg";
import LoginContext from "./context/LoginContext";

const AppProvider = () => {
  const { lang } = useI18n();
  const token = JSON.parse(localStorage.getItem("token") ? true : false);
  const [theme, setTheme] = useState(false);
  const [isLogin, setIsLogin] = useState(token);
  useEffect(() => {
    const root = document.documentElement;
    if (theme) {
      root.classList.add("dark");
      root.classList.remove("light");
    } else {
      root.classList.remove("dark");
      root.classList.add("light");
    }
  }, [theme]);
  return (
    <Suspense fallback={<LoadingSvg />}>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <LoginContext.Provider value={{ isLogin, setIsLogin }}>
            <ThemeContext.Provider value={{ theme, setTheme }}>
              <div
                dir={lang === "en" ? "ltr" : "rtl"}
                className={`bg-background-default max-w-480 mx-auto`}
              >
                <RouterProvider router={router} />
                <ToastContainer
                  position="top-right"
                  autoClose={3000}
                  hideProgressBar={false}
                  closeOnClick={false}
                  rtl={lang === "en" ? false : true}
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
          </LoginContext.Provider>
        </QueryClientProvider>
      </Provider>
    </Suspense>
  );
};

export default AppProvider;
