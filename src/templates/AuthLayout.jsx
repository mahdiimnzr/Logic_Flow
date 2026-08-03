import PageTransition from "@/components/atoms/PageTransition/PageTransition";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className={`min-h-screen content-center`}>
      <div
        className={`md:min-h-auto bg-default-light w-9/10 mx-auto md:rounded-[60px] rounded-[30px] shadow-[2px_4px_8px_0px_#000000]/15 dark:shadow-[2px_4px_8px_0px_#ffffff]/15`}
      >
        <PageTransition>
          <Outlet />
        </PageTransition>
      </div>
    </div>
  );
};

export default AuthLayout;
