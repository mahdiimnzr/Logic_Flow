import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className={`min-h-screen xl:py-20 md:py-30 py-10 `}>
      <div
        className={`bg-default-light w-9/10 mx-auto rounded-[60px] shadow-[2px_4px_8px_0px_#000000]/15 dark:shadow-[2px_4px_8px_0px_#ffffff]/15`}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
