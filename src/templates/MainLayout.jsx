import { Outlet } from "react-router-dom";
import Header from "../components/molecules/Header/Header";
import Footer from "@/components/molecules/Footer/Footer";
import UpBtn from "@/components/molecules/UpBtn/UpBtn";
import AiChat from "@/components/molecules/AiChat/AiChat";
import NotificationModal from "@/components/molecules/Notification/NotificationModal";
import { useGetUnSeenNotifications } from "@/core/services/api/landing/landing.service";
import { useContext, useEffect } from "react";
import NotificationContext from "@/app/context/NotificationContext";
import PageTransition from "@/components/atoms/PageTransition/PageTransition";
import LoginContext from "@/app/context/LoginContext";

const MainLayout = () => {
  const { isLoading, data } = useGetUnSeenNotifications();
  const { notificationOpen, setNotificationOpen } =
    useContext(NotificationContext);
  const { isLogin } = useContext(LoginContext);

  useEffect(() => {
    if (localStorage.getItem("token") && isLogin && !isLoading) {
      setNotificationOpen(true);
    }
    if (
      data &&
      localStorage.getItem("notifications") != JSON.stringify(data) &&
      data.success != false
    ) {
      localStorage.setItem("notifications", JSON.stringify(data));
    } else if (localStorage.getItem("notifications") == JSON.stringify(data)) {
      setNotificationOpen(false);
    }
  }, [data, isLogin]);
  return (
    <div className={`relative`}>
      <NotificationModal
        isOpen={notificationOpen}
        setIsOpen={setNotificationOpen}
        data={data?.data}
        isLoading={isLoading ?? false}
      />
      <UpBtn />
      <AiChat />
      <Header />
      <PageTransition>
        <Outlet />
      </PageTransition>
      <Footer />
    </div>
  );
};

export default MainLayout;
