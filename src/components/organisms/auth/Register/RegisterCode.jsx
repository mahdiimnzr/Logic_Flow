import { Formik, Form, ErrorMessage } from "formik";
import { useContext, useState } from "react";
import * as Yup from "yup";
import Button from "../../../atoms/Buttons/Button";
import ArrowRightIcon from "../../../../core/icons/ArrowRightIcon";
import OtpInput from "../../../molecules/Inputs/OtpInput";
import { toast } from "react-toastify";
import { verifyMessageRegister } from "@/core/services/api/auth/auth.service";
import ThemeSlide from "@/components/molecules/theme/ThemeSlide";
import ThemeContext from "@/app/context/ThemeContext";
import Timer from "@/components/atoms/Timer/Timer";

const validationSchema = Yup.object({
  verifyCode: Yup.string()
    .trim()
    .length(6, "پرکردن فیلد ها الزامی است !")
    .required("پرکردن فیلد ها الزامی است !"),
});

const RegisterCode = ({ setPage, registerData }) => {
  const [timer, setTimer] = useState(120);
  const { theme, setTheme } = useContext(ThemeContext);
  const otp = new Array(6).fill("");
  const [otpValue, setOtpValue] = useState("");
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
              className={`flex flex-col gap-20 xl:pt-19 lg:pt-15 md:pt-10 pt-2`}
            >
              <div className={`flex items-center justify-between w-full`}>
                <div
                  onClick={() => {
                    setPage("Step1");
                  }}
                  className={`flex gap-2 cursor-pointer `}
                >
                  <ArrowRightIcon className={`xl:size-6 sm:size-5 size-4`} />
                  <span
                    className={`text-green-dark xl:text-base sm:text-[14px] text-[12px] font-bold`}
                  >
                    بازگشت
                  </span>
                </div>
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
                    ایجاد حساب کاربری
                  </span>
                  <span
                    className={`xl:text-[16px] lg:text-[15px] md:text-[14px] text-[12px] text-default-black`}
                  >
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
                    className={`text-red-error lg:text-[14px] text-[12px] font-normal`}
                  />
                </div>
                <Button
                  color={"authBtn"}
                  className={`xl:h-15 lg:h-13 h-11 xl:text-base! lg:text-[14px]! text-[12px]!`}
                >
                  تایید رمز یکبار مصرف
                </Button>
                <div className={`flex justify-center`}>
                  {timer === 0 ? (
                    <p
                      onClick={() => {
                        setTimer(120);
                      }}
                      className={`text-default-black md:text-base text-[12px]`}
                    >
                      ارسال مجدد کد؟
                    </p>
                  ) : (
                    <Timer timer={timer} setTimer={setTimer} />
                  )}
                </div>
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default RegisterCode;
