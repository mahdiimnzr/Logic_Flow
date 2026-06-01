import useGetCourses from "@/core/services/api/common/useGetCourse";
import { useI18n } from "@/i18n/useI18n";
import { ChevronLeft } from "lucide-react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const CoursesList = () => {
  const { t } = useI18n();
  const params = useSelector((state) => state.coursesSlice.params);
  const {
    isLoading,
    data: courses,
    refetch,
  } = useGetCourses("CoursesList", params);
  return (
    <div className={`flex flex-col items-center gap-32`}>
      <div className={`flex flex-col items-center gap-4`}>
        <div className={`flex items-center gap-1`}>
          <Link
            to={"/"}
            className={`text-[14px] font-normal text-green-primary`}
          >
            {t("courses.navigation.homePage")}
          </Link>
          <ChevronLeft className={`size-4`} color="#008C78" />
          <Link className={`text-[14px] font-normal text-green-primary`}>
            {t("courses.navigation.coursesPage")}
          </Link>
        </div>
        <div className={`flex items-center gap-2`}>
          <p className={`text-default-black md:text-[32px] font-bold`}>
            {t("courses.navigation.title")}
          </p>
          <span className={`text-field-silver md:text-base font-normal`}>
            ({courses?.data?.totalCount} {t("courses.navigation.result")})
          </span>
        </div>
      </div>
      <div className={`flex justify-center gap-8 w-full`}>
        <div className={`md:w-2/10 h-100 bg-white`}></div>
        <div className={`md:w-8/10 flex flex-col gap-8`}>
          <div
            className={`bg-default-light rounded-[15px] shadow-[0px_2px_5px_0_#000000]/15 dark:shadow-[0px_2px_5px_0_#ffffff]/15 p-4 flex items-center justify-between`}
          >
            <div className={`flex items-center gap-4`}>
              <span className={`text-default-black font-normal md:text-base`}>
                {t("courses.sorting.sortBy")}
              </span>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursesList;
