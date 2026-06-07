import { Formik, Form } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import FormInput from "../../../molecules/Inputs/FormInput";
import Button from "../../../atoms/Buttons/Button";
import ArrowRightIcon from "../../../../core/icons/ArrowRightIcon";
import KeyIcon from "../../../../core/icons/KeyIcon";
import { useContext, useEffect } from "react";
import { toast } from "react-toastify";
import { ResetPassNewPass } from "@/core/services/api/auth/auth.service";
import ThemeSlide from "@/components/molecules/theme/ThemeSlide";
import ThemeContext from "@/app/context/ThemeContext";
import { useI18n } from "@/i18n/useI18n";

const NewPassword = () => {
  const { t, lang, changeLang } = useI18n();
  const { theme, setTheme } = useContext(ThemeContext);
  const email = JSON.parse(localStorage.getItem("email"));
  const { verifyCode } = useParams();
  const navigate = useNavigate();
  const handleSubmit = async (value) => {
    const response = await ResetPassNewPass(value);
    if (response.data.success) {
      toast.success(response.data.message);
      navigate("/Auth/Login");
    } else {
      toast.error(response.data.message);
    }
  };
  useEffect(() => {
    if (!email) {
      navigate("/Auth/ResetPassword/ResetPassInFormation");
    }
  }, []);

  const validationSchema = Yup.object({
    newPassword: Yup.string()
      .trim()
      .min(8, t("auth.resetPassword.step2.passwordMoreThan8"))
      .required("رمز عبور وارد شده معتبر نیست!"),
    repeatPassword: Yup.string()
      .trim()
      .min(8, t("auth.resetPassword.step2.repeatPasswordMoreThan8"))
      .oneOf(
        [Yup.ref("newPassword")],
        t("auth.resetPassword.step2.repeatPasswordMatchError"),
      )
      .required(t("auth.resetPassword.step2.repeatPasswordErrorMessage")),
  });
  return (
    <Formik
      initialValues={{
        gmail: email,
        newPassword: "",
        repeatPassword: "",
        resetValue: verifyCode,
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
              <div
                onClick={() => {
                  navigate("/Auth/ResetPassword/ResetPassInFormation");
                }}
                className={`flex gap-2 cursor-pointer `}
              >
                <ArrowRightIcon className={`xl:size-6 sm:size-5 size-4`} />
                <span
                  className={`text-green-dark xl:text-base sm:text-[14px] text-[12px] font-bold `}
                >
                  {t("auth.resetPassword.step2.backBtn")}
                </span>
              </div>
              <div className={`flex items-center lg:gap-2 gap-1`}>
                <div
                  onClick={() =>
                    lang === "en" ? changeLang("fa") : changeLang("en")
                  }
                  className={`cursor-pointer lg:size-10 size-8 rounded-full bg-green-primary content-center text-center text-white md:text-base text-[12px] font-bold border lg:leading-10 leading-8 border-green-primary`}
                >
                  {lang === "en" ? "EN" : "FA"}
                </div>
                <ThemeSlide
                  theme={theme}
                  setTheme={setTheme}
                  className={`flex md:hidden`}
                />
              </div>
            </div>
            <div className={`flex flex-col xl:gap-8 lg:gap-4 gap-5`}>
              <div className={`flex flex-col gap-2 text-center`}>
                <span
                  className={`text-green-primary xl:text-2xl lg:text-[18px] md:text-base text-[14px] font-bold text-center`}
                >
                  {t("auth.resetPassword.step2.title")}
                </span>
                <span
                  className={`xl:text-[16px] lg:text-[15px] md:text-[14px] text-[12px] text-default-black`}
                >
                  {t("auth.resetPassword.step2.description")}
                </span>
              </div>
              <FormInput
                icon={<KeyIcon />}
                error={errors.newPassword}
                name={"newPassword"}
                type={"password"}
                placeholder={t("auth.resetPassword.step2.passwordPlaceHolder")}
                className={`xl:h-15! lg:h-13! md:h-11! sm:h-13! h-11!`}
                errorMessageClassName={`lg:text-[14px]! text-[12px]!`}
              />
              <FormInput
                icon={<KeyIcon />}
                error={errors.repeatPassword}
                name={"repeatPassword"}
                type={"password"}
                placeholder={t(
                  "auth.resetPassword.step2.repeatPasswordPlaceHolder",
                )}
                className={`xl:h-15! lg:h-13! md:h-11! sm:h-13! h-11!`}
                errorMessageClassName={`lg:text-[14px]! text-[12px]!`}
              />
              <Button
                color={"authBtn"}
                className={`xl:h-15 lg:h-13 h-11 xl:text-base! lg:text-[14px]! text-[12px]!`}
              >
                {t("auth.resetPassword.step2.submitNewPassword")}
              </Button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default NewPassword;
