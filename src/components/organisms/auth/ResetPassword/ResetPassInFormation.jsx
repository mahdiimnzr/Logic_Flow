import { Formik, Form } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import FormInput from "../../../molecules/Inputs/FormInput";
import HomeIcon from "../../../../core/icons/HomeIcon";
import Button from "../../../atoms/Buttons/Button";
import EmailIcon from "@/core/icons/EmailIcon";
import { ResetPassInFormations } from "@/core/services/api/auth/auth.service";
import { toast } from "react-toastify";
import ThemeSlide from "@/components/molecules/theme/ThemeSlide";
import { useContext } from "react";
import ThemeContext from "@/app/context/ThemeContext";
import { useDispatch } from "react-redux";
import { updateResetPass } from "@/app/store/actions";
import { useI18n } from "@/i18n/useI18n";

const ResetPassInFormation = () => {
  const { t, lang, changeLang } = useI18n();
  const dispatch = useDispatch();
  const { theme, setTheme } = useContext(ThemeContext);
  const handleSubmit = async (value) => {
    const response = await ResetPassInFormations(value);
    if (response.data.success) {
      toast.success(response.data.message);
      dispatch(updateResetPass(value.email));
      localStorage.setItem("email", JSON.stringify(value.email));
    } else {
      toast.error(response.data.message);
    }
  };
  const validationSchema = Yup.object({
    email: Yup.string()
      .trim()
      .email(t("auth.resetPassword.step1.emailErrorMessage"))
      .required(t("auth.resetPassword.step1.emailErrorMessage")),
  });
  return (
    <Formik
      initialValues={{
        email: "",
        baseUrl:
          "https://logic-flow-ivory.vercel.app/Auth/ResetPassword/NewPassword",
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
                  className={`text-green-dark xl:text-base sm:text-[14px] text-[12px] font-bold leading-7`}
                >
                  {t("auth.resetPassword.step1.homeBtn")}
                </p>
              </Link>
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
                  {t("auth.resetPassword.step1.title")}
                </span>
                <span
                  className={`xl:text-[16px] lg:text-[15px] md:text-[14px] text-[12px] text-default-black`}
                >
                  {t("auth.resetPassword.step1.description")}
                </span>
              </div>
              <FormInput
                icon={<EmailIcon />}
                error={errors?.email}
                name={"email"}
                type={"text"}
                placeholder={t("auth.resetPassword.step1.inputPlaceHolder")}
                className={`xl:h-15! lg:h-13! md:h-11! sm:h-13! h-11!`}
                errorMessageClassName={`lg:text-[14px]! text-[12px]!`}
              />
              <Button
                color={"authBtn"}
                className={`xl:h-15 lg:h-13 h-11 xl:text-base! lg:text-[14px]! text-[12px]!`}
              >
                {t("auth.resetPassword.step1.sendRequest")}
              </Button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default ResetPassInFormation;
