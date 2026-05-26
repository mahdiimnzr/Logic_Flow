import { Outlet, useLocation } from "react-router-dom";

const MainLayout = () => {
  const { pathname } = useLocation();
  return (
    <div
      // className={`${pathname === "/" ? `bg-light-green` : `bg-background-default`}`}
    >
      <div className={`w-[95%] h-11.5 top-6 relative mx-auto`}></div>
      <Outlet />
    </div>
  );
};

export default MainLayout;
