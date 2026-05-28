import { Formik, Form } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import FormInput from "../../../molecules/Inputs/FormInput";
import EmailIcon from "../../../../core/icons/EmailIcon";
import Button from "../../../atoms/Buttons/Button";
import ArrowRightIcon from "../../../../core/icons/ArrowRightIcon";
import KeyIcon from "../../../../core/icons/KeyIcon";

const validationSchema = Yup.object({
  phoneOrGmail: Yup.string()
    .min(8, " ایمیل حداقل باید تشکیل شده از 8 حروف باشد")
    .required("ایمیل وارد شده معتبر نیست!"),
  password: Yup.string()
    .min(8, "رمز عبور حداقل باید تشکیل شده از 8 حروف باشد")
    .required("رمز عبور وارد شده معتبر نیست!"),
  passwordd: Yup.string()
    .min(8, "رمز عبور حداقل باید تشکیل شده از 8 حروف باشد")
    .required("رمز عبور وارد شده معتبر نیست!"),
});

const NewPassword = ({ setWhichStep }) => {
  const Navigate = useNavigate();
  const handleSubmit = () => {
    Navigate("/Auth/Login");
  };
  return (
    <Formik
      initialValues={{
        phoneOrGmail: "",
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        handleSubmit();
        console.log(values);
      }}
    >
      {({ errors }) => (
        <Form>
          <div className={`flex flex-col xl:gap-8 gap-3 xl:pt-19.5 pt-10`}>
            <div
              onClick={() => {
                setWhichStep("Step2");
              }}
              className={`flex gap-2 cursor-pointer`}
            >
              <ArrowRightIcon />
              <span className={`text-green-dark text-3.5 font-bold `}>
                بازگشت
              </span>
            </div>
            <div className={`flex flex-col gap-2 cursor-pointer`}>
              <span
                className={`text-green-primary xl:text-[24px] lg:text-[20px] text-[16px] font-bold text-center  `}
              >
                ایجاد حساب کاربری
              </span>
              <span
                className={`xl:text-[16px] lg:text-[14px] text-[13px] text-default-black text-center`}
              >
                کامل کردن مشخصات
              </span>
            </div>
            <div className={`flex flex-col gap-10 `}>
              <FormInput
                icon={<KeyIcon />}
                error={errors.phoneOrGmail}
                name={"password"}
                type={"password"}
                placeholder={"رمز عبور خود را وارد کنید"}
              />
              <FormInput
                icon={<KeyIcon />}
                error={errors.phoneOrGmail}
                name={"passwordd"}
                type={"password"}
                placeholder={"تکرار رمز عبور"}
              />
            </div>
            <Button color={"authBtn"} className={`h-15 `}>
              ثبت نام
            </Button>
            <div
              className={`flex gap-2 justify-center text-[14px] font-normal cursor-pointer`}
            >
              <p className={`text-default-black`}>
                حساب کاربری دارید؟{" "}
                <Link to={"/Auth/Login"} className={`text-green-primary`}>
                  وارد شوید
                </Link>
              </p>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default NewPassword;
