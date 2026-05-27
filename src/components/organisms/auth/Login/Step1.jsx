import { Formik, Form } from "formik";
import { useState } from "react";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import FormInput from "../../../molecules/Inputs/FormInput";
import EmailIcon from "../../../../core/icons/EmailIcon";
import CheckBox from "../../../molecules/Inputs/CheckBox";
import HomeIcon from "../../../../core/icons/HomeIcon";
import Button from "../../../atoms/Buttons/Button";

const validationSchema = Yup.object({
  phoneOrGmail: Yup.string()
    .min(8, " ایمیل حداقل باید تشکیل شده از 8 حروف باشد")
    .required("ایمیل وارد شده معتبر نیست!"),
  password: Yup.string()
    .min(8, "رمز عبور حداقل باید تشکیل شده از 8 حروف باشد")
    .required("رمز عبور وارد شده معتبر نیست!"),
});

const Step1 = ({ setWhichStep }) => {
  const [checked, setChecked] = useState(false);
  const handleSubmit = () => {
    setWhichStep("Step2");
  };

  return (
    <Formik
      initialValues={{
        phoneOrGmail: "",
        password: "",
        rememberMe: "",
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        handleSubmit();
        console.log(values);
      }}
    >
      {({ errors, setFieldValue, values }) => {
        const newValue = checked;
        if (values.rememberMe !== checked) {
          setFieldValue("rememberMe", newValue);
        }
        return (
          <Form>
            <Link to={"/"} className={`flex gap-2`}>
              <HomeIcon />
              <p className={`text-green-dark text-3.5 font-bold`}>صفحه اصلی</p>
            </Link>
            <div className={`flex flex-col gap-8 xl:mt-20 lg:mt-15 mt-6`}>
              <span
                className={`text-green-primary xl:text-[24px] lg:text-[20px] md:text-[16px] font-bold text-center  `}
              >
                ورود به حساب کاربری
              </span>
              <div className={`flex flex-col gap-10 `}>
                <FormInput
                  icon={<EmailIcon />}
                  error={errors.phoneOrGmail}
                  name={"phoneOrGmail"}
                  type={"text"}
                  placeholder={"ایمیل یا شماره تماس"}
                />
                <FormInput
                  icon={<EmailIcon />}
                  error={errors.password}
                  name={"password"}
                  type={"password"}
                  placeholder={"رمز عبور "}
                />
              </div>
              <div className={`flex justify-between`}>
                <CheckBox
                  id={"rememberMe"}
                  name={"rememberMe"}
                  checked={checked}
                  setChecked={() => {
                    setChecked(!checked);
                    console.log(checked);
                  }}
                  label={"مرا به خاطر بسپار"}
                />
                <span
                  className={`text-field-silver text-[14px] font-normal ml-3`}
                >
                  فراموشی رمز عبور
                </span>
              </div>

              <Button color={"authBtn"} className={`h-15`}>
                ارسال کد یکبار مصرف
              </Button>
              <div
                className={`flex gap-2 justify-center text-[14px] font-normal`}
              >
                <p className={`text-default-black`}>
                  حساب کاربری دارید؟{" "}
                  <Link to={"/Auth/Register"} className={`text-green-primary`}>
                    ثبت نام
                  </Link>
                </p>
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default Step1;
