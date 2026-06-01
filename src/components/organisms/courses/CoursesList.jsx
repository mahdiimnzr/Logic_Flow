import { updateParams } from "@/app/store/actions";
import Button from "@/components/atoms/Buttons/Button";
import Card from "@/components/molecules/Cards/Card";
import PaginationComponents from "@/components/molecules/Pagination/Pagination";
import View from "@/components/molecules/View/View";
import {
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Skeleton } from "@/components/ui/skeleton";
import useAddFavoriteCourse from "@/core/services/api/hooks/useAddFavoriteCourses";
import useGetCourses from "@/core/services/api/hooks/useGetCourse";
import { useI18n } from "@/i18n/useI18n";
import { ChevronLeft } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const CoursesList = () => {
  const { t } = useI18n();
  const dispatch = useDispatch();
  const [gridView, setGridView] = useState(true);
  const skeletonCount = new Array(8).fill("");
  const [whichPage, setWhichPage] = useState(1);
  const params = useSelector((state) => state.coursesSlice.params);
  const {
    isLoading,
    data: courses,
    refetch,
  } = useGetCourses("CoursesList", params);
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
        <div className={`lg:w-2/10 flex-col gap-8 hidden lg:flex`}></div>
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
          <div
            className={`grid ${gridView ? `2xl:grid-cols-4 xl:grid-cols-3 md:grid-cols-2 grid-cols-1` : `2xl:grid-cols-2 grid-cols-1`} gap-4`}
          >
            {isLoading
              ? skeletonCount?.map(() => (
                  <div
                    dir="rtl"
                    className={`w-full p-5 flex flex-col gap-5 rounded-[20px] bg-field-silver`}
                  >
                    <Skeleton className={`h-55 w-full`} />
                    <Skeleton className={`h-7 w-5/10`} />
                    <Skeleton className={`h-14 w-7/10`} />
                    <Skeleton className={`h-7 w-full`} />
                    <Skeleton className={`h-7 w-full`} />
                  </div>
                ))
              : courses?.data?.courseFilterDtos?.map((course, index) => (
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
