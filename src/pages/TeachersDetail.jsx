import { useEffect } from "react";
import TeacherDetail from "../components/organisms/teacherDetail/TeacherDetail";
const TeachersDetail = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className={`md:pb-30 pb-10 md:pt-30 pt-20 md:w-[95%] w-[90%] mx-auto`}>
      <TeacherDetail />
    </div>
  );
};

export default TeachersDetail;
