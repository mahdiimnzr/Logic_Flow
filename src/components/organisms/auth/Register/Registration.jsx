import { Formik, Form } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import FormInput from "../../../molecules/Inputs/FormInput";
import HomeIcon from "../../../../core/icons/HomeIcon";
import Button from "../../../atoms/Buttons/Button";
import { sendVerifyRegister } from "@/core/services/api/auth/auth.service";
import { toast } from "react-toastify";
import EmailIcon from "@/core/icons/EmailIcon";
import ThemeSlide from "@/components/molecules/theme/ThemeSlide";
import ThemeContext from "@/app/context/ThemeContext";
import { useContext } from "react";
import { useI18n } from "@/i18n/useI18n";

const Registration = ({ setPage, setRegisterData }) => {
  const { t } = useI18n();
  const { theme, setTheme } = useContext(ThemeContext);
  const handleSubmit = async (value) => {
    const response = await sendVerifyRegister(value);
    if (response.data.success) {
      toast.success(response.data.message);
      setPage("Step2");
      setRegisterData(value);
    } else {
      toast.error(response.data.message);
    }
  };
  const validationSchema = Yup.object({
    gmail: Yup.string()
      .trim()
      .email(t("auth.register.step1.emailErrorMessage"))
      .required(t("auth.register.step1.emailErrorMessage")),
  });
  return (
    <Formik
      initialValues={{
        gmail: "",
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        handleSubmit(values);
      }}
    >
      {({ errors }) => (
        <Form>
          <div
            className={`flex flex-col xl:gap-25 lg:gap-20 gap-15 xl:pt-19 lg:pt-15 md:pt-10 pt-2`}
          >
            <div className={`flex items-center justify-between w-full`}>
              <Link to={"/"} className={`flex gap-2`}>
                <HomeIcon className={`xl:size-6 sm:size-5 size-4`} />
                <p
                  className={`text-green-dark xl:text-base sm:text-[14px] text-[12px] font-bold`}
                >
                  {t("auth.register.step1.homeBtn")}
                </p>
              </Link>
              <ThemeSlide
                theme={theme}
                setTheme={setTheme}
                className={`flex md:hidden`}
              />
            </div>
            <div className={`flex flex-col xl:gap-8 lg:gap-4 gap-5`}>
              <div className={`flex flex-col gap-2 text-center`}>
                <span
                  className={`text-green-primary xl:text-2xl lg:text-[18px] md:text-base text-[14px] font-bold text-center`}
                >
                  {t("auth.register.step1.title")}
                </span>
                <span
                  className={`xl:text-[16px] lg:text-[15px] md:text-[14px] text-[12px] text-default-black`}
                >
                  {t("auth.register.step1.description")}
                </span>
              </div>
              <FormInput
                icon={<EmailIcon />}
                error={errors.gmail}
                name={"gmail"}
                type={"text"}
                placeholder={t("auth.register.step1.inputPlaceHolder")}
                className={`xl:h-15! lg:h-13! md:h-11! sm:h-13! h-11!`}
                errorMessageClassName={`lg:text-[14px]! text-[12px]!`}
              />
              <Button
                color={"authBtn"}
                className={`xl:h-15 lg:h-13 h-11 xl:text-base! lg:text-[14px]! text-[12px]!`}
              >
                {t("auth.register.step1.sendVerifyCode")}
              </Button>
              <div
                className={`flex gap-2 justify-center lg:text-[14px] text-[12px] font-normal cursor-pointer`}
              >
                <p className={`text-default-black`}>
                  {t("auth.register.step1.haveAccount")}
                  <Link to={"/Auth/Login"} className={`text-green-primary`}>
                    {t("auth.register.step1.login")}
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default Registration;
