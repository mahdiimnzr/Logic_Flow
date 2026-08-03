import { QueryClientProvider } from "@tanstack/react-query";
import { Suspense, useCallback, useEffect, useState } from "react";
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
import OnlineStatusOverlay from "@/components/molecules/OnlineStatus/OnlineStatusOverlay";
import OnlineStatusContext from "./context/OnlineStatusContext";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotificationContext from "./context/NotificationContext";
import { A11yProvider } from "./context/A11yContext";

let statusHandlers = null;
export const getStatusHandlers = () => statusHandlers;

const AppProvider = () => {
  const { lang } = useI18n();
  const token = localStorage.getItem("token") ? true : false;
  const isDark = JSON.parse(localStorage.getItem("theme"));
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [theme, setTheme] = useState(isDark ?? false);
  const [isLogin, setIsLogin] = useState(token);
  const [status, setStatus] = useState(null);
  const [notificationOpen, setNotificationOpen] = useState(false);

  const setOffline = useCallback(() => setStatus("offline"), []);
  const setServerError = useCallback(() => setStatus("server-error"), []);
  const setBanned = useCallback(() => setStatus("banned"), []);
  const clearStatus = useCallback(() => setStatus(null), []);

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
  useEffect(() => {
    statusHandlers = {
      setOffline,
      setServerError,
      setBanned,
      clearStatus,
    };
  }, [setOffline, setServerError, setBanned, clearStatus]);
  useEffect(() => {
    if (!isOnline) {
      setOffline();
    } else {
      clearStatus();
    }
  }, [isOnline, setOffline, clearStatus]);
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);
  return (
    <Suspense
      fallback={
        <div className="w-full h-full bg-background-default">
          <LoadingSvg />
        </div>
      }
    >
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <LoginContext.Provider value={{ isLogin, setIsLogin }}>
            <ThemeContext.Provider value={{ theme, setTheme }}>
              <OnlineStatusContext.Provider
                value={{
                  status,
                  setOffline,
                  setServerError,
                  setBanned,
                  clearStatus,
                }}
              >
                <NotificationContext.Provider
                  value={{ notificationOpen, setNotificationOpen }}
                >
                  <A11yProvider>
                    <TooltipProvider>
                      <div
                        dir={lang === "en" ? "ltr" : "rtl"}
                        className={`bg-background-default max-w-600 mx-auto ${lang === "en" ? "font-sans" : null}`}
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
                          transition={Bounce}
                          stacked
                          toastStyle={{
                            fontFamily: "IRANYekanXFaNum",
                          }}
                        />
                        <OnlineStatusOverlay />
                      </div>
                    </TooltipProvider>
                  </A11yProvider>
                </NotificationContext.Provider>
              </OnlineStatusContext.Provider>
            </ThemeContext.Provider>
          </LoginContext.Provider>
        </QueryClientProvider>
      </Provider>
    </Suspense>
  );
};

export default AppProvider;
