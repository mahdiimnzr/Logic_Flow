import ThemeContext from "@/app/context/ThemeContext";
import ThemeSlide from "@/components/molecules/theme/ThemeSlide";
import ResetPassword1 from "../../../assets/images/Reset Password1.png";
import ResetPassword2 from "../../../assets/images/Reset Password2.png";
import { useContext } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useI18n } from "@/i18n/useI18n";

const ResetPassword = () => {
  const { t } = useI18n();
  const { theme, setTheme } = useContext(ThemeContext);
  const { pathname } = useLocation();
  return (
    <div
      className={`w-full flex flex-col md:flex-row-reverse p-4 justify-end xl:gap-24 lg:gap-15 md:gap-6 gap-10`}
    >
      <div
        className={`h-full lg:w-4/10 md:w-5/10 w-full flex flex-col justify-between`}
      >
        <Outlet />
      </div>
      <div
        className={`md:w-5/10 px-8 lg:py-15 md:py-10 py-5 bg-light-green relative md:rounded-[60px] rounded-[30px] md:flex flex-col items-center gap-6 text-center hidden`}
      >
        <ThemeSlide
          theme={theme}
          setTheme={setTheme}
          className={`self-end md:flex hidden`}
        />
        <img
          src={
            pathname == "/Auth/ResetPassword/ResetPassInFormation"
              ? ResetPassword1
              : ResetPassword2
          }
          className={`xl:size-108 lg:size-78 md:size-55`}
        />
        <div className={`flex flex-col justify-center items-center xl:gap-4`}>
          <h2
            className={`text-green-dark xl:text-[24px] lg:text-[20px] md:text-[16px] font-bold  `}
          >
            {pathname == "/Auth/ResetPassword/ResetPassInFormation"
              ? t("auth.resetPassword.step1.imageTitle")
              : t("auth.resetPassword.step1.imageTitle")}
          </h2>
          <p
            className={`text-default-black xl:text-[16px] lg:text-[15px] md:text-[13px] xl:w-132.5 md:w-80 text-center`}
          >
            {pathname == "/Auth/ResetPassword/ResetPassInFormation"
              ? t("auth.resetPassword.step1.imageDescription")
              : t("auth.resetPassword.step1.imageDescription")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
