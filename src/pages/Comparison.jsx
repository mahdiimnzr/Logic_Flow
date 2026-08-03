import Compare from "@/components/organisms/Comparison/Compare";
import { useEffect } from "react";

const Comparison = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className={`md:pb-30 pb-10 md:pt-30 pt-20 md:w-[95%] w-[90%] mx-auto`}>
      <Compare />
    </div>
  );
};

export default Comparison;
