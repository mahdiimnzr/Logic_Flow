import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";

const OtpInput = () => {
  return (
    <InputOTP  id="digits-only" maxLength={6} pattern={REGEXP_ONLY_DIGITS}>
      <InputOTPGroup className={`flex items-center justify-between`}>
        <InputOTPSlot className={`size-15 border-transparent outline-none ring-0 shadow-none bg-background-default rounded-[15px]`} index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
        <InputOTPSlot index={3} />
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
      </InputOTPGroup>
    </InputOTP>
  );
};

export default OtpInput;
