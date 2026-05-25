import { useState } from "react";
import Step1 from "./Login/step1";
import Step2 from "./Login/Step2";

const Login = () => {
  const [whichStep, setWhichStep] = useState("Step1");
  const [SignUpParams, setSignUpParams] = useState({});
  return (
    <div className={`h-full flex flex-col justify-between`}>
      {whichStep === "Step1" && (
        <Step1
          SignUpParams={SignUpParams}
          setSignUpParams={setSignUpParams}
          setWhichStep={setWhichStep}
        />
      )}
      {/* {whichStep === "Step2" && (
        <Step2 SignUpParams={SignUpParams} setWhichStep={setWhichStep} />
      )} */}
    </div>
  );
};

export default Login;
