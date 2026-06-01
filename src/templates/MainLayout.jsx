import { Outlet } from "react-router-dom";
import Header from "../components/molecules/Header/Header";
import Footer from "@/components/molecules/Footer/Footer";

const MainLayout = () => {
  return (
    <div className={`relative`}>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default MainLayout;
