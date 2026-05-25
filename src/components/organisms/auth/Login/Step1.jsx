import { Form, Formik } from "formik";
import FormInput from "../../molecules/Inputs/FormInput";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import HomeIcon from "../../../core/icons/HomeIcon";
import CheckBox from "../../molecules/Inputs/CheckBox";
import EmailIcon from "../../../core/icons/EmailIcon";
import { useState } from "react";
import Button from "../../atoms/Button/Button";

const validationSchema = Yup.object({
  phoneOrGmail: Yup.string().required("ایمیل وارد شده معتبر نیست!"),
  password: Yup.string().required("رمز عبور وارد شده معتبر نیست!"),
});

const Step1 = () => {
  const [checked, setChecked] = useState(false);
  return (
    <Formik
      initialValues={{
        phoneOrGmail: "",
        password: "",
      }}
      validationSchema={validationSchema}
      onSubmit={(value) => {
        console.log(value);
      }}
    >
      {({ errors }) => (
        <Form>
          <div className={`flex gap-2 `}>
            <HomeIcon />
            <Link to={"/"} className={`text-green-dark text-3.5 font-bold `}>
              صفحه اصلی
            </Link>
          </div>
          <div className={`flex flex-col gap-7.5 mt-15`}>
            <span
              className={`text-green-primary text-[26px] font-bold text-center`}
            >
              ورود به حساب کاربری
            </span>
            <div className={`flex flex-col gap-10 `}>
              <FormInput
                icon={<EmailIcon />}
                error={errors.text}
                name={"text"}
                type={"text"}
                placeholder={"ایمیل یا شماره تماس"}
              />
              <FormInput
                icon={<EmailIcon />}
                error={errors.text}
                name={"password"}
                type={"password"}
                placeholder={"رمز عبور "}
              />
            </div>
            <div className={`flex justify-between`}>
              <CheckBox
                id={"checkbox"}
                name={"myCheckBox"}
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

            <Button
              type="submit"
              className={` xl:w-115.75 h-15 bg-green-primary m-auto rounded-full text-[16px] text-default-light`}
            >
              ارسال کد یکبار مصرف
            </Button>
            <div
              className={`flex gap-2 justify-center text-[14px] font-normal`}
            >
              <p className={`text-default-black`}>حساب کاربری ندارید؟</p>
              <Link to={"/Auth/Register"} className={`text-green-primary`}>
                ثبت نام
              </Link>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default Step1;
