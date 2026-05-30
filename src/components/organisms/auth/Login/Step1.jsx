import { Formik, Form } from "formik";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import FormInput from "../../../molecules/Inputs/FormInput";
import CheckBox from "../../../molecules/Inputs/CheckBox";
import HomeIcon from "../../../../core/icons/HomeIcon";
import Button from "../../../atoms/Buttons/Button";
import KeyIcon from "../../../../core/icons/KeyIcon";
import HumanIcon from "@/core/icons/HumanIcon";
import { postLogin } from "@/core/services/api/auth/auth.service";
import { toast } from "react-toastify";

const validationSchema = Yup.object({
  phoneOrGmail: Yup.string().required("ایمیل وارد شده معتبر نیست!"),
  password: Yup.string()
    .min(8, "رمز عبور حداقل باید تشکیل شده از 8 حروف باشد")
    .required("رمز عبور وارد شده معتبر نیست!"),
});

const Step1 = ({ setWhichStep, setSignUpParams, SignUpParams }) => {
  const [checked, setChecked] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (value) => {
    const result = await postLogin(value);
    if (result.data.success) {
      toast.success(result.data.message);
      if (result.data.token) {
        navigate("/");
      } else {
        setWhichStep("Step2");
        setSignUpParams({ ...SignUpParams, phoneOrGmail: value.phoneOrGmail });
        localStorage.setItem("token", JSON.stringify(result.data.token));
      }
    } else {
      toast.error(result.data.message);
    }
  };

  return (
    <Formik
      initialValues={{
        phoneOrGmail: "",
        password: "",
        rememberMe: false,
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        handleSubmit(values);
      }}
    >
      {({ errors, setFieldValue, values }) => {
        const newValue = checked;
        if (values.rememberMe !== checked) {
          setFieldValue("rememberMe", newValue);
        }
        return (
          <Form>
            <div className={`flex flex-col xl:gap-10 gap-5 xl:pt-19 pt-8 `}>
              <Link to={"/"} className={`flex gap-2`}>
                <HomeIcon />
                <p className={`text-green-dark text-3.5 font-bold`}>
                  صفحه اصلی
                </p>
              </Link>
              <div className={`flex flex-col gap-8 xl:mt-18 lg:mt-8 mt-3`}>
                <span
                  className={`text-green-primary xl:text-[24px] lg:text-[20px] md:text-[16px] font-bold text-center  `}
                >
                  ورود به حساب کاربری
                </span>
                <div className={`flex flex-col gap-10 `}>
                  <FormInput
                    icon={<HumanIcon />}
                    error={errors.phoneOrGmail}
                    name={"phoneOrGmail"}
                    type={"text"}
                    placeholder={"ایمیل یا شماره تماس"}
                  />
                  <FormInput
                    icon={<KeyIcon />}
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
                  <Link
                    to={"/Auth/ResetPassword"}
                    className={`text-field-silver text-[14px] font-normal ml-3`}
                  >
                    فراموشی رمز عبور
                  </Link>
                </div>

                <Button color={"authBtn"} className={`h-15`}>
                  ارسال کد یکبار مصرف
                </Button>
                <div
                  className={`flex gap-2 justify-center text-[14px] font-normal cursor-pointer`}
                >
                  <p className={`text-default-black`}>
                    حساب کاربری دارید؟{" "}
                    <Link
                      to={"/Auth/Register"}
                      className={`text-green-primary`}
                    >
                      ثبت نام
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default Step1;
