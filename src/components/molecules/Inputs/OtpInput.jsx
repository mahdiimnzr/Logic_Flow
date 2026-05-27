import { useRef } from "react";

const OtpInput = ({ otp, setOtp, error }) => {
  const otpBoxReference = useRef([]);

  const handleChange = (value, index) => {
    if (value >= "0" && value <= "9") {
      let newArr = [...otp];
      newArr[index] = value;
      setOtp(newArr);
      if (index < otp.length - 1) {
        otpBoxReference.current[index + 1].focus();
      }
    } else if (value === "") {
      let newArr = [...otp];
      newArr[index] = "";
      setOtp(newArr);
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      if (!otp[index] && index > 0) {
        let newArr = [...otp];
        newArr[index - 1] = "";
        setOtp(newArr);
        otpBoxReference.current[index - 1].focus();
      } else if (otp[index]) {
        let newArr = [...otp];
        newArr[index] = "";
        setOtp(newArr);
      }
    }
  };

  return otp.map((value, index) => (
    <input
      key={index}
      value={value}
      className={`rounded-[15px] bg-background-default xl:size-13.5 lg:size-11.5 size-9.5 text-[20px] text-default-black text-center box-content outline-none content-center transition-all focus:scale-115 ${
        value ? "border-2 border-[#008C78]" : ""
      } ${error && !value ? `border-2 border-red-error` : ``}`}
      type="text"
      name="confirmCode"
      maxLength={1}
      inputMode="numeric"
      onChange={(e) => {
        handleChange(e.target.value, index);
      }}
      onKeyDown={(e) => {
        handleKeyDown(e, index);
      }}
      ref={(reference) => (otpBoxReference.current[index] = reference)}
    />
  ));
};

export default OtpInput;
