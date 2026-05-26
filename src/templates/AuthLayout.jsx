import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className={`min-h-screen pt-30 `}>
      <div className={` bg-default-light xl:w-9/10  mx-auto rounded-[60px] `}>
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
