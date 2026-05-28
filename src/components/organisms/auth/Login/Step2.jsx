import { Formik, Form, ErrorMessage } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import Button from "../../../atoms/Buttons/Button";
import ArrowRightIcon from "../../../../core/icons/ArrowRightIcon";
import OtpInput from "../../../molecules/Inputs/OtpInput";

const validationSchema = Yup.object({
  verifyCode: Yup.string()
    .length(6, "پرکردن فیلد ها الزامی است !")
    .required("پرکردن فیلد ها الزامی است !"),
});

const Step2 = ({ setWhichStep }) => {
  const Navigate = useNavigate();
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const handleSubmit = () => {
    Navigate("/");
  };
  return (
    <Formik
      initialValues={{
        verifyCode: "",
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        handleSubmit();
        console.log(values);
      }}
    >
      {({ errors, values, setFieldValue }) => {
        const newCode = otp.join("");
        if (values.verifyCode !== newCode) {
          setFieldValue("verifyCode", newCode);
        }
        return (
          <Form>
            <div
              className={`flex flex-col xl:gap-15 gap-5 xl:pt-27.75 lg:pt-21.75 md:pt-17.75 pt-10`}
            >
              <div
                className={`flex gap-2 `}
                onClick={() => {
                  setWhichStep("Step1");
                }}
              >
                <ArrowRightIcon />
                <div
                  className={`text-green-dark text-3.5 font-bold cursor-pointer `}
                >
                  بازگشت
                </div>
              </div>
              <div
                className={`flex flex-col items-center justify-center gap-10 xl:mt-20 lg:mt-15 mt-6`}
              >
                <div
                  className={`flex flex-col gap-2 text-center cursor-pointer`}
                >
                  {" "}
                  <span
                    className={`text-green-primary xl:text-[24px] lg:text-[20px] md:text-[16px] font-bold  `}
                  >
                    ورود به حساب کاربری
                  </span>
                  <span className={`text-[16px] text-default-black`}>
                    رمز یکبار مصرف ارسال شده را وارد کنید
                  </span>
                </div>

                <div dir="ltr" className={`flex xl:gap-8 lg:gap-6 gap-3.5 `}>
                  <OtpInput
                    otp={otp}
                    setOtp={setOtp}
                    error={errors?.verifyCode}
                  />
                </div>
                <ErrorMessage component={"span"} name="verifyCode" />
                <Button color={"authBtn"} className={` h-15 w-full`}>
                  ارسال کد یکبار مصرف
                </Button>
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default Step2;
