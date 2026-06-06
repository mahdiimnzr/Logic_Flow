import { useContext, useState } from "react";
import loginStep1 from "../../../assets/images/loginstep1.png";
import loginStep2 from "../../../assets/images/loginstep And Register2.png";
import ThemeSlide from "../../../components/molecules/theme/ThemeSlide";
import Step1 from "./Login/Step1";
import Step2 from "./Login/Step2";
import ThemeContext from "@/app/context/ThemeContext";
import { useI18n } from "@/i18n/useI18n";

const Login = () => {
  const { t } = useI18n();
  const { theme, setTheme } = useContext(ThemeContext);
  const [whichStep, setWhichStep] = useState("Step1");
  const [SignUpParams, setSignUpParams] = useState({ phoneOrGmail: "" });
  return (
    <div
      className={`w-full flex flex-col md:flex-row p-4 justify-end xl:gap-24 lg:gap-15 md:gap-6 gap-10`}
    >
      <div
        className={`h-full lg:w-4/10 md:w-5/10 w-full flex flex-col justify-between`}
      >
        {whichStep == "Step1" ? (
          <Step1
            whichStep={whichStep}
            setWhichStep={setWhichStep}
            setSignUpParams={setSignUpParams}
            SignUpParams={SignUpParams}
          />
        ) : (
          <Step2
            whichStep={whichStep}
            setWhichStep={setWhichStep}
            SignUpParams={SignUpParams}
          />
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
          src={whichStep == "Step1" ? loginStep1 : loginStep2}
          className={`xl:w-108 lg:w-78 md:w-55 w-full`}
        />
        <div
          className={`flex flex-col justify-center items-center xl:gap-4 gap-5`}
        >
          <h2
            className={`text-green-dark xl:text-[24px] lg:text-[20px] sm:text-base text-[14px] font-bold`}
          >
            {whichStep == "Step1"
              ? t("auth.login.step1.imageTitle")
              : t("auth.login.step1.imageTitle")}
          </h2>
          <p
            className={`text-default-black xl:text-base lg:text-[15px] sm:text-[13px] text-[12px] xl:w-132.5 lg:w-90 md:w-80 sm:w-ull text-center`}
          >
            {whichStep == "Step1"
              ? t("auth.login.step1.imageDescription")
              : t("auth.login.step1.imageDescription")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
