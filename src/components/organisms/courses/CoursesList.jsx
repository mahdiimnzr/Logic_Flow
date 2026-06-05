import "rc-slider/assets/index.css";
import { updateFilters, updateParams } from "@/app/store/actions";
import Card from "@/components/molecules/Cards/Card";
import PaginationComponents from "@/components/molecules/Pagination/Pagination";
import { PaginationItem } from "@/components/ui/pagination";
import { Skeleton } from "@/components/ui/skeleton";
import useAddFavoriteCourse from "@/core/services/api/hooks/useAddFavoriteCourses";
import useGetCourses from "@/core/services/api/hooks/useGetCourse";
import { useI18n } from "@/i18n/useI18n";
import { ChevronLeft } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";
import Filters from "./Filters";
import SortsSection from "./SortsSection";

const CoursesList = () => {
  const { t, lang } = useI18n();
  const dispatch = useDispatch();

  const [searchParams, setSearchParams] = useSearchParams();

  const skeletonCount = new Array(8).fill("");
  const [whichPage, setWhichPage] = useState(1);
  const [rowPageCount, setRowPageCount] = useState(12);
  const [gridView, setGridView] = useState(true);
  const params = useSelector((state) => state.coursesSlice.params);

  const { searchValue } = useSelector((state) => state.coursesSlice.filters);

  const setFilter = (key, value) => dispatch(updateFilters({ key, value }));

  const {
    isLoading,
    data: courses,
    refetch,
  } = useGetCourses("CoursesList", params);

  const pageCount = useMemo(
    () =>
      courses?.data?.totalCount
        ? Math.ceil(courses?.data?.totalCount / rowPageCount)
        : 1,
    [courses?.data?.totalCount, rowPageCount],
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
      if (window.innerWidth <= 768) {
        setGridView(false);
      }
      if (window.innerWidth <= 640) {
        setGridView(true);
      }
    };
  });
  useEffect(() => {
    refetch();
  }, [params]);
  useEffect(() => {
    !isLoading && setFilter(searchValue, searchParams.get("Query"));
    dispatch(
      updateParams({
        key: "Query",
        value: searchParams.get("Query"),
      }),
    );
    dispatch(
      updateParams({
        key: "CostDown",
        value: searchParams.get("CostDown"),
      }),
    );
    dispatch(
      updateParams({
        key: "CostUp",
        value: searchParams.get("CostUp"),
      }),
    );
    dispatch(
      updateParams({
        key: "StartDate",
        value: searchParams.get("StartDate"),
      }),
    );
    dispatch(
      updateParams({
        key: "EndDate",
        value: searchParams.get("EndDate"),
      }),
    );
    dispatch(
      updateParams({
        key: "courseLevelId",
        value: searchParams.get("courseLevelId"),
      }),
    );
    dispatch(
      updateParams({
        key: "CourseTypeId",
        value: searchParams.get("CourseTypeId"),
      }),
    );
    dispatch(
      updateParams({
        key: "TechCount",
        value: searchParams.get("TechCount"),
      }),
    );
    dispatch(
      updateParams({
        key: "ListTech",
        value: searchParams.get("ListTech"),
      }),
    );
    dispatch(
      updateParams({
        key: "TeacherId",
        value: searchParams.get("TeacherId"),
      }),
    );
  }, [isLoading]);
  return (
    <div className={`flex flex-col items-center lg:gap-32 md:gap-20 gap-10`}>
      <div className={`flex flex-col items-center gap-4`}>
        <div className={`flex items-center gap-1`}>
          <Link
            to={"/"}
            className={`text-[14px] font-normal text-green-primary`}
          >
            {t("courses.navigation.homePage")}
          </Link>
          <ChevronLeft
            className={`size-4 ${lang === "en" ? "transform-[rotate(180deg)]" : "transform-[rotate(0deg)]"}`}
            color="#008C78"
          />
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
        <div className={`xl:w-2/10 lg:3/10 flex-col gap-8 hidden lg:flex`}>
          <Filters
            searchParams={searchParams}
            setSearchParams={setSearchParams}
          />
        </div>
        <div className={`xl:w-8/10 lg:w-7/10 w-full flex flex-col gap-8`}>
          <SortsSection
            gridView={gridView}
            setGridView={setGridView}
            searchParams={searchParams}
            setSearchParams={setSearchParams}
            rowPageCount={rowPageCount}
            setRowPageCount={setRowPageCount}
          />
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
          <PaginationComponents
            prevOnClick={() => {
              const firstPage = pageArray[0];
              whichPage !== firstPage &&
                (setWhichPage(whichPage - 1),
                dispatch(
                  updateParams({ key: "PageNumber", value: whichPage - 1 }),
                ),
                window.scroll(0, 0));
            }}
            nextOnClick={() => {
              const lastPage = pageArray[pageArray.length - 1];
              whichPage !== lastPage &&
                (setWhichPage(whichPage + 1),
                dispatch(
                  updateParams({ key: "PageNumber", value: whichPage + 1 }),
                ),
                window.scroll(0, 0));
            }}
          >
            {pageArray?.map((value, index) => (
              <PaginationItem
                key={index}
                onClick={() => {
                  whichPage !== value &&
                    (setWhichPage(value),
                    dispatch(updateParams({ key: "PageNumber", value: value })),
                    window.scroll(0, 0));
                }}
                className={`cursor-pointer sm:size-12.5 size-8 bg-light-gray sm:rounded-[15px] rounded-[10px] shadow-[0px_2px_5px_0px_#000000]/15 flex items-center justify-center sm:text-[18px] text-[14px] font-normal`}
                isActive={whichPage !== value ? false : true}
              >
                {value}
              </PaginationItem>
            ))}
          </PaginationComponents>
        </div>
      </div>
    </div>
  );
};

export default CoursesList;
