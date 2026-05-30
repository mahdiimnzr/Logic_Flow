import { Formik, Form, ErrorMessage } from "formik";
import { useState } from "react";

import * as Yup from "yup";
import Button from "../../../atoms/Buttons/Button";
import ArrowRightIcon from "../../../../core/icons/ArrowRightIcon";
import OtpInput from "../../../molecules/Inputs/OtpInput";
import { toast } from "react-toastify";
import { verifyMessageRegister } from "@/core/services/api/auth/auth.service";
const RegisterCode = ({ setPage, registerData }) => {
  const otp = new Array(6).fill("");
  const [otpValue, setOtpValue] = useState("");
  const validationSchema = Yup.object({
    verifyCode: Yup.string()
      .trim()
      .length(6, "پرکردن فیلد ها الزامی است !")
      .required("پرکردن فیلد ها الزامی است !"),
  });
  const handleSubmit = async (value) => {
    const response = await verifyMessageRegister(value);
    if (response.data.success) {
      toast.success(response.data.message);
      setPage("Step3");
    } else {
      toast.error(response.data.message);
    }
  };
  return (
    <Formik
      initialValues={{
        gmail: registerData?.gmail,
        verifyCode: "",
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        handleSubmit(values);
      }}
    >
      {({ errors, values, setFieldValue }) => {
        const newCode = otpValue;
        if (values.verifyCode !== newCode) {
          setFieldValue("verifyCode", newCode);
        }
        console.log(values.verifyCode);
        return (
          <Form>
            <div
              className={`flex flex-col xl:gap-15 gap-5 xl:pt-27.75 lg:pt-21.75 md:pt-17.75 pt-10`}
            >
              <div
                onClick={() => {
                  setPage("Step1");
                }}
                className={`flex gap-2 cursor-pointer `}
              >
                <ArrowRightIcon />
                <span
                  className={`text-green-dark text-3.5 font-bold cursor-pointer `}
                >
                  بازگشت
                </span>
              </div>
              <div className={`flex flex-col gap-10`}>
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
                <div className={`flex flex-col gap-2 w-full`}>
                  <div dir="ltr" className={`flex w-full`}>
                    <OtpInput
                      otp={otp}
                      otpValue={otpValue}
                      setOtpValue={setOtpValue}
                      error={errors?.verifyCode}
                    />
                  </div>
                  <ErrorMessage
                    component={"span"}
                    name="verifyCode"
                    className={`text-red-error text-[14px] font-normal mt-2`}
                  />
                </div>
                <Button color={"authBtn"} className={` h-15 w-full`}>
                  تایید رمز یکبار مصرف
                </Button>
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default RegisterCode;
