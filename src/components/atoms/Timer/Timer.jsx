import formatTime from "@/core/utils/formatTime";
import { useEffect } from "react";

const Timer = ({ timer, setTimer }) => {
  useEffect(() => {
    let myInterval = setInterval(() => {
      if (timer > 0) {
        setTimer(timer - 1);
      }
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  });

  return <h1 className={`text-default-black`}>{formatTime(timer)}</h1>;
};

export default Timer;
