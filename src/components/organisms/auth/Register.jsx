import { useContext, useState } from "react";
import Registration from "./Register/Registration";
import ThemeSlide from "../../molecules/theme/ThemeSlide";
import RegisterCode from "./Register/RegisterCode";
import RegisterStep1 from "../../../assets/images/registerStep1.png";
import Register2 from "../../../assets/images/loginstep And Register2.png";
import RegisterComplete from "./Register/RegisterComplete";
import ThemeContext from "@/app/context/ThemeContext";
import { useI18n } from "@/i18n/useI18n";
const Register = () => {
  const { t } = useI18n();
  const { theme, setTheme } = useContext(ThemeContext);
  const [page, setPage] = useState("Step1");
  const [registerData, setRegisterData] = useState({ gmail: "" });
  return (
    <div
      className={`w-full flex flex-col md:flex-row-reverse p-4 justify-end xl:gap-24 lg:gap-15 md:gap-6 gap-10`}
    >
      <div
        className={`h-full lg:w-4/10 md:w-5/10 w-full flex flex-col justify-between`}
      >
        {page === "Step1" && (
          <Registration setRegisterData={setRegisterData} setPage={setPage} />
        )}
        {page === "Step2" && (
          <RegisterCode registerData={registerData} setPage={setPage} />
        )}
        {page === "Step3" && (
          <RegisterComplete registerData={registerData} setPage={setPage} />
        )}
      </div>
      <div
        className={`md:w-5/10 px-8 lg:py-15 md:py-10 py-5 bg-light-green relative md:rounded-[60px] rounded-[30px] md:flex hidden flex-col items-center gap-6 text-center`}
      >
        <ThemeSlide
          theme={theme}
          setTheme={setTheme}
          className={`self-end md:flex hidden`}
        />
        <img
          src={page === "Step2" ? Register2 : RegisterStep1}
          className={`xl:size-108 lg:size-85 md:size-70 w-full`}
        />
        <div
          className={`flex flex-col justify-center items-center xl:gap-4 gap-5`}
        >
          <h2
            className={`text-green-dark xl:text-[24px] lg:text-[20px] sm:text-base text-[14px] font-bold`}
          >
            {page === "Step1"
              ? t("auth.register.step1.imageTitle")
              : page === "Step2"
                ? t("auth.register.step1.imageTitle")
                : t("auth.register.step1.imageTitle")}
          </h2>
          <span
            className={`text-default-black xl:text-base lg:text-[15px] sm:text-[13px] text-[12px] xl:w-132.5 lg:w-90 md:w-80 sm:w-ull text-center`}
          >
            {page == "Step1"
              ? t("auth.register.step1.imageDescription")
              : page === "Step2"
                ? t("auth.register.step1.imageDescription")
                : t("auth.register.step1.imageDescription")}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Register;
