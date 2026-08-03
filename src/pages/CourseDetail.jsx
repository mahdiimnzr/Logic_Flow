import CourseInformation from "@/components/organisms/couresDetail/CourseInformation";
import { useEffect } from "react";

const CourseDetail = () => {
  useEffect(() => {
    window.scroll(0, 0);
  }, []);
  return (
    <div className={`md:pb-30 pb-10 md:pt-30 pt-20 md:w-[95%] w-[90%] mx-auto`}>
      <CourseInformation />
    </div>
  );
};

export default CourseDetail;
