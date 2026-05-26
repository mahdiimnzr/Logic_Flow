import { Formik, Form, ErrorMessage } from "formik";
import Button from "../components/atoms/Buttons/Button";
import * as Yup from "yup";
import OtpInput from "../components/molecules/Inputs/OtpInput";
import { useState } from "react";
import HeroSection from "../components/organisms/landing/HeroSection";

const validationSchema = Yup.object({
  verifyCode: Yup.string()
    .length(6, "پرکردن فیلد ها الزامی است !")
    .required("پرکردن فیلد ها الزامی است !"),
});

const Landing = () => {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  return (
    <div className={`flex flex-col items-center`}>
      <HeroSection />
      <Formik
        initialValues={{ verifyCode: "" }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {({ errors, setFieldValue, values }) => {
          const otpValue = otp.join("");
          if (values.verifyCode !== otpValue) {
            setFieldValue("verifyCode", otpValue);
          }
          return (
            <Form>
              <div dir="ltr" className={`flex gap-10`}>
                <OtpInput otp={otp} setOtp={setOtp} error={errors.verifyCode} />
              </div>
              <ErrorMessage
                name="verifyCode"
                component={"span"}
                className="text-red-error text-[14px] font-normal"
              />
              <Button color={"primaryBtn"} type="submit">
                Click Meeee
              </Button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default Landing;
