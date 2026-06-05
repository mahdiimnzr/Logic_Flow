import Person from "@/core/icons/Person";

import { useGetCourseDetail } from "@/core/services/api/CourseDetails/CourseDetails.service";
import { useParams } from "react-router-dom";

const ReviewPage = () => {
  const { id } = useParams();
  const { isLoading, data: Details } = useGetCourseDetail(id);
  return (
    <>
      <div className={`flex flex-col gap-9 w-9/10 `}>
        <span className={`size-4.5 font-bold text-default-black`}>جزئیات</span>
        <div className={`flex justify-center items-center gap-[50px] `}>
          <div
            className={`xl:w-[186px] xl:h-[81px] rounded-[20px] bg-default-light flex flex-col gap-0.5 justify-center items-center`}
          >
            <span className={`text-[12px] text-field-silver`}>
              تعداد دانشجو
            </span>
            <div className={`flex gap-2 justify-center items-center`}>
              <Person />
              <span className={`text-default-black`}>
                {Details?.data?.studentCount} نفر
              </span>
            </div>
          </div>
          <div
            className={`xl:w-46.5 xl:h-20.25 rounded-[20px] bg-default-light flex flex-col gap-0.5 justify-center items-center`}
          >
            <span className={`text-[12px] text-field-silver`}>سطح دوره</span>
            <div className={`flex gap-2 justify-center items-center`}>
              <Person />
              <span className={`text-default-black`}>
                {" "}
                {Details?.data?.courseLevelName}{" "}
              </span>
            </div>
          </div>
          <div
            className={`xl:w-46.5 xl:h-20.25 rounded-[20px] bg-default-light flex flex-col gap-0.5 justify-center items-center`}
          >
            <span className={`text-[12px] text-field-silver`}>وضعیت دوره</span>
            <div className={`flex gap-2 justify-center items-center`}>
              <Person />
              <span className={`text-default-black`}>
                {" "}
                {Details?.data?.active === true
                  ? "درحال برگزاری"
                  : "پایان رسیده است"}{" "}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className={`xl:w-[887px]  mt-10`}>
        <span className={`text-[18px] text-default-black font-bold`}>
          توضیحات
        </span>
        <p className={`text-field-silver leading-loose`}>
          {Details?.data?.describe}
        </p>
      </div>
    </>
  );
};

export default ReviewPage;
