import { updateParams } from "@/app/store/actions";
import Button from "@/components/atoms/Buttons/Button";
import AccordionMultiple from "@/components/molecules/Accordion/Accordions";
import Card from "@/components/molecules/Cards/Card";
import CheckBox from "@/components/molecules/Inputs/CheckBox";
import PaginationComponents from "@/components/molecules/Pagination/Pagination";
import View from "@/components/molecules/View/View";
import {
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetCoursesLevels } from "@/core/services/api/courses/courses.service";
import useAddFavoriteCourse from "@/core/services/api/hooks/useAddFavoriteCourses";
import useGetCourses from "@/core/services/api/hooks/useGetCourse";
import { useI18n } from "@/i18n/useI18n";
import debounce from "debounce";
import { ChevronLeft, Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const CoursesList = () => {
  const { t } = useI18n();
  const dispatch = useDispatch();
  const [gridView, setGridView] = useState(true);
  const skeletonCount = new Array(8).fill("");
  const [whichPage, setWhichPage] = useState(1);
  const [selectedLevel, setSelectedLevel] = useState(null);
  const params = useSelector((state) => state.coursesSlice.params);
  const {
    isLoading,
    data: courses,
    refetch,
  } = useGetCourses("CoursesList", params);
  const { isLoading: levelsLoading, data: levels } =
    useGetCoursesLevels("CourseLevels");
  const pageCount = useMemo(
    () =>
      courses?.data?.totalCount ? Math.ceil(courses?.data?.totalCount / 12) : 1,
    [courses?.data?.totalCount],
  );
  const pageArray = useMemo(() => {
    const pages = [];
    for (let index = 1; index <= pageCount; index++) pages.push(index);
    return pages;
  }, [pageCount]);
  const handleSearch = debounce((value) => {
    const searchValue = value.trim() === "" ? null : value.trim();
    dispatch(
      updateParams({
        key: "Query",
        value: searchValue,
      }),
    );
  }, 1000);
  useEffect(() => {
    window.onresize = () => {
      if (window.innerWidth <= 1024) {
        setGridView(true);
      }
    };
  });
  useEffect(() => {
    refetch();
  }, [params]);
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
        <div className={`lg:w-2/10 flex-col gap-8 hidden lg:flex`}>
          <div
            className={`bg-default-light shadow-[0px_2px_5px_0px_#000000]/15 dark:shadow-[0px_2px_5px_0px_#ffffff]/15 rounded-[15px] py-4 px-2 flex items-center justify-between`}
          >
            <input
              className={`text-base font-normal text-field-silver placeholder:text-field-silver outline-none w-9/10`}
              placeholder={t("courses.filters.searchPlaceHolder")}
              type="text"
              onChange={(event) => handleSearch(event.target.value)}
            />
            <Search className={`w-1/10`} color="#848484" />
          </div>
          <AccordionMultiple
            value={"coursesStartAndEndDate"}
            className={`bg-default-light text-default-black text-[18px] font-bold p-4 rounded-[15px] shadow-[0px_2px_5px_0px_#000000]/15 dark:shadow-[0px_2px_5px_0px_#ffffff]/15`}
            trigger={t("courses.filters.startAndEndDate")}
            triggerClassName={`hover:no-underline! cursor-pointer`}
          >
            <p>"adawldmakwd</p>
          </AccordionMultiple>
          <AccordionMultiple
            value={"coursesLevel"}
            className={`bg-default-light text-default-black text-[18px] font-bold p-4 rounded-[15px] shadow-[0px_2px_5px_0px_#000000]/15 dark:shadow-[0px_2px_5px_0px_#ffffff]/15`}
            trigger={t("courses.filters.coursesLevel")}
            triggerClassName={`hover:no-underline! cursor-pointer`}
          >
            <div className={`flex flex-col gap-4`}>
              {levels?.data.map((value, index) => (
                <CheckBox
                  key={index}
                  label={value.levelName}
                  id="courseLevels"
                  labelId={value.id}
                  type="radio"
                  checked={selectedLevel === value.id}
                  onChange={() => {
                    setSelectedLevel(value.id);
                    const { checked } = event.target;
                    if (checked) {
                      dispatch(
                        updateParams({ key: "courseLevelId", value: value.id }),
                      );
                    } else {
                      dispatch(
                        updateParams({ key: "courseLevelId", value: null }),
                      );
                    }
                  }}
                />
              ))}
            </div>
          </AccordionMultiple>
        </div>
        <div className={`lg:w-8/10 w-full flex flex-col gap-8`}>
          <div
            className={`bg-default-light rounded-[15px] shadow-[0px_2px_5px_0_#000000]/15 dark:shadow-[0px_2px_5px_0_#ffffff]/15 p-4 flex items-center justify-between`}
          >
            <div className={`flex items-center gap-4`}>
              <span className={`text-default-black font-normal md:text-base`}>
                {t("courses.sorting.sortBy")}
              </span>
            </div>
            <View view={gridView} setView={setGridView} />
            <Button
              color={"authBtn"}
              className={`px-3 py-2 font-normal! block lg:hidden`}
            >
              ترتیب و فیلتر
            </Button>
          </div>
          {isLoading ? (
            <div
              className={`grid 2xl:grid-cols-4 xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4`}
            >
              {skeletonCount?.map((_, index) => (
                <div
                  key={index}
                  dir="rtl"
                  className={`w-full p-5 flex flex-col gap-5 rounded-[20px] bg-field-silver`}
                >
                  <Skeleton className={`h-55 w-full`} />
                  <Skeleton className={`h-7 w-5/10`} />
                  <Skeleton className={`h-14 w-7/10`} />
                  <Skeleton className={`h-7 w-full`} />
                  <Skeleton className={`h-7 w-full`} />
                </div>
              ))}
            </div>
          ) : courses?.data?.courseFilterDtos?.length === 0 ? (
            <span
              className={`font-bold text-4xl w-full text-center text-default-black`}
            >
              موردی یافت نشد
            </span>
          ) : (
            <div
              className={`grid ${gridView ? `2xl:grid-cols-4 xl:grid-cols-3 md:grid-cols-2 grid-cols-1` : `2xl:grid-cols-2 grid-cols-1`} gap-4`}
            >
              {courses?.data?.courseFilterDtos?.map((course, index) => (
                <Card
                  view={gridView}
                  key={index}
                  courseId={course.courseId}
                  title={course.title}
                  describe={course.describe}
                  levelName={course.levelName}
                  teacherName={course.teacherName}
                  rate={course.courseRate.avg}
                  cost={course.cost}
                  image={course.imageAddress}
                  isCourseCard={true}
                  isFavorite={false}
                  handleAddFavoriteCourse={useAddFavoriteCourse}
                />
              ))}
            </div>
          )}
          <PaginationComponents contentClassName={`flex gap-4`}>
            <PaginationItem
              onClick={() => {
                const firstPage = pageArray[0];
                whichPage !== firstPage &&
                  (setWhichPage(whichPage - 1),
                  dispatch(
                    updateParams({ key: "PageNumber", value: whichPage - 1 }),
                  ),
                  window.scroll(0, 0));
              }}
              className={`cursor-pointer size-12.5 bg-light-gray rounded-[15px] shadow-[0px_2px_5px_0px_#000000]/15 flex items-center justify-center text-[18px] font-normal`}
            >
              <PaginationPrevious />
            </PaginationItem>
            {pageArray?.map((value, index) => (
              <PaginationItem
                key={index}
                onClick={() => {
                  whichPage !== value &&
                    (setWhichPage(value),
                    dispatch(updateParams({ key: "PageNumber", value: value })),
                    window.scroll(0, 0));
                }}
                className={`cursor-pointer size-12.5 bg-light-gray rounded-[15px] shadow-[0px_2px_5px_0px_#000000]/15 flex items-center justify-center text-[18px] font-normal`}
                isActive={whichPage !== value ? false : true}
              >
                {value}
              </PaginationItem>
            ))}
            <PaginationItem
              onClick={() => {
                const lastPage = pageArray[pageArray.length - 1];
                whichPage !== lastPage &&
                  (setWhichPage(whichPage + 1),
                  dispatch(
                    updateParams({ key: "PageNumber", value: whichPage + 1 }),
                  ),
                  window.scroll(0, 0));
              }}
              className={`cursor-pointer size-12.5 bg-light-gray rounded-[15px] shadow-[0px_2px_5px_0px_#000000]/15 flex items-center justify-center text-[18px] font-normal`}
            >
              <PaginationNext />
            </PaginationItem>
          </PaginationComponents>
        </div>
      </div>
    </div>
  );
};

export default CoursesList;
