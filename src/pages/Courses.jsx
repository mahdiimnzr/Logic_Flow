import CoursesList from "@/components/organisms/courses/CoursesList";
import { useEffect } from "react";

const Courses = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className={`md:pb-30 pb-10 md:pt-30 pt-20 md:w-[95%] w-[90%] mx-auto`}>
      <CoursesList />
    </div>
  );
};

export default Courses;
