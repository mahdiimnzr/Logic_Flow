import ThemeContext from "@/app/context/ThemeContext";
import Person from "@/core/icons/Person";
import TechnologyCardIcon from "@/core/icons/TechnologyCardIcon";
import Time from "@/core/icons/Time";

import { useGetCourseDetail } from "@/core/services/api/CourseDetails/CourseDetails.service";
import { useContext } from "react";
import { useParams } from "react-router-dom";

const NewsReview = () => {
  const { id } = useParams();
  const { theme } = useContext(ThemeContext);
  const { isLoading, data: Details } = useGetCourseDetail(id);
  return (
    <div className={`flex flex-col xl:gap-10 gap-8`}>
      <div>
        <span
          className={`xl:text-[18px] text-base font-bold text-default-black`}
        >
          توضیحات
        </span>
        <p
          className={`text-field-silver xl:text-base text-[14px] font-normal leading-loose`}
        >
          {Details?.data?.describe}
        </p>
      </div>
    </div>
  );
};

export default NewsReview;
