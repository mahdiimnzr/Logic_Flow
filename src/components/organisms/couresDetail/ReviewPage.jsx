import ThemeContext from "@/app/context/ThemeContext";
import HandleIdentityEditorJs from "@/components/atoms/EditorJSFormat/EditorDetailValidation";
import Person from "@/core/icons/Person";
import TechnologyCardIcon from "@/core/icons/TechnologyCardIcon";
import Time from "@/core/icons/Time";
import { useGetCourseDetail } from "@/core/services/api/CourseDetails/CourseDetails.service";
import { useI18n } from "@/i18n/useI18n";
import { useContext } from "react";
import { useParams } from "react-router-dom";

const ReviewPage = () => {
  const { t } = useI18n();
  const { id } = useParams();
  const { theme } = useContext(ThemeContext);
  const { data: Details } = useGetCourseDetail(id);
  return (
    <div className={`flex flex-col xl:gap-10 gap-8`}>
      <div className={`flex flex-col xl:gap-8 gap-6`}>
        <span
          className={`xl:text-[18px] text-base font-bold text-default-black`}
        >
          {t("courseDetail.details")}
        </span>
        <div
          className={`flex sm:flex-row flex-col justify-center items-center xl:gap-12.5 gap-8`}
        >
          <div
            className={`xl:w-1/4 sm:w-2/5 w-3/4 xl:h-25 sm:h-20 h-25 rounded-[20px] bg-default-light flex flex-col gap-1 justify-center items-center`}
          >
            <span
              className={`2xl:text-[14px] sm:text-[12px] text-[14px] text-field-silver`}
            >
              {t("courseDetail.studentCount")}
            </span>
            <div className={`flex gap-2 justify-center items-center`}>
              <Person color={!theme ? "#1E1E1E" : "#FFFFFF"} />
              <span
                className={`text-default-black 2xl:text-[18px] xl:text-base sm:text-[14px] text-base`}
              >
                {Details?.data?.studentCount} {t("courseDetail.studentNumbers")}
              </span>
            </div>
          </div>
          <div
            className={`xl:w-1/4 sm:w-2/5 w-3/4 xl:h-25 sm:h-20 h-25 rounded-[20px] bg-default-light flex flex-col gap-1 justify-center items-center`}
          >
            <span
              className={`2xl:text-[14px] sm:text-[12px] text-[14px] text-field-silver`}
            >
              {t("courseDetail.courseLevel")}
            </span>
            <div className={`flex gap-2 justify-center items-center`}>
              <TechnologyCardIcon
                width="16"
                height="16"
                color={!theme ? "#1E1E1E" : "#FFFFFF"}
              />
              <span
                className={`text-default-black 2xl:text-[18px] xl:text-base sm:text-[14px] text-base`}
              >
                {Details?.data?.courseLevelName}
              </span>
            </div>
          </div>
          <div
            className={`xl:w-1/4 sm:w-2/5 w-3/4 xl:h-25 sm:h-20 h-25 rounded-[20px] bg-default-light flex flex-col gap-1 justify-center items-center`}
          >
            <span
              className={`2xl:text-[14px] sm:text-[12px] text-[14px] text-field-silver`}
            >
              {t("courseDetail.courseStatus")}
            </span>
            <div className={`flex gap-2 justify-center items-center`}>
              <Time
                width="16"
                height="16"
                color={!theme ? "#1E1E1E" : "#FFFFFF"}
              />
              <span
                className={`text-default-black 2xl:text-[18px] xl:text-base sm:text-[14px] text-base`}
              >
                {Details?.data?.statusName}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <span
          className={`xl:text-[18px] text-base font-bold text-default-black`}
        >
          {t("courseDetail.describe")}
        </span>
        <HandleIdentityEditorJs desc={Details?.data?.describe} />
      </div>
    </div>
  );
};

export default ReviewPage;
