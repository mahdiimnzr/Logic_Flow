import { Outlet } from "react-router-dom";
import Header from "../components/molecules/Header/Header";
import Footer from "@/components/molecules/Footer/Footer";
import UpBtn from "@/components/molecules/UpBtn/UpBtn";

const MainLayout = () => {
  return (
    <div className={`relative`}>
      <UpBtn />
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default MainLayout;
