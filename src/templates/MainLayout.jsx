import { Outlet } from "react-router-dom";
import Header from "../components/molecules/Header/Header";

const MainLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default MainLayout;
