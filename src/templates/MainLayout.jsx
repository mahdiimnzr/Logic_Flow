import { Outlet } from "react-router-dom";
import Header from "../components/molecules/Header/Header";
import Footer from "@/components/molecules/Footer/Footer";

const MainLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default MainLayout;
