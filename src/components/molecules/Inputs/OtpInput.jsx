import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";

const OtpInput = ({ otp, setOtpValue, otpValue, error }) => {
  return (
    <InputOTP
      name="verifyCode"
      id="digits-only"
      maxLength={6}
      pattern={REGEXP_ONLY_DIGITS}
      containerClassName={`w-full!`}
      onChange={(value) => {
        setOtpValue(value);
      }}
    >
      <InputOTPGroup className={`flex! items-center! justify-between! w-full!`}>
        {otp?.map((value, index) => (
          <InputOTPSlot
            className={`lg:text-[20px] md:text-base text-[18px] box-border xl:size-15 lg:size-13 md:size-10 sm:size-15 size-9 border-transparent border-2 outline-none ring-0 shadow-none bg-background-default xl:rounded-[15px] md:rounded-[10px] sm:rounded-[15px] rounded-[10px] data-[active=true]:transform-[scale(1.25)] ${otpValue[index] && "border-green-primary"} ${error && !otpValue[index] && "border-red-error"}`}
            key={index}
            index={index}
          />
        ))}
      </InputOTPGroup>
    </InputOTP>
  );
};

export default OtpInput;
