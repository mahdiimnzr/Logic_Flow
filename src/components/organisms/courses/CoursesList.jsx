import "rc-slider/assets/index.css";
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
import { ChevronLeft, ListFilterPlus, Search } from "lucide-react";
import { useContext, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Filters from "./Filters";
import SelectModal from "@/components/molecules/Select/Select";
import { rowsOfPages, sortingTypes } from "@/core/constants/courseSortings";
import ThemeContext from "@/app/context/ThemeContext";
import DrawerComponents from "@/components/molecules/Drawer/Drawer";
import debounce from "debounce";
import { DrawerClose } from "@/components/ui/drawer";

const CoursesList = () => {
  const { t, lang } = useI18n();
  const dispatch = useDispatch();

  const skeletonCount = new Array(8).fill("");
  const [whichPage, setWhichPage] = useState(1);
  const [sortTypes, setSortTypes] = useState("expensive");
  const [rowPageCount, setRowPageCount] = useState(12);
  const [gridView, setGridView] = useState(true);
  const params = useSelector((state) => state.coursesSlice.params);
  const { theme } = useContext(ThemeContext);

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

  const handleSearch = debounce((value) => {
    const searchValue = value.trim() === "" ? null : value.trim();
    dispatch(updateParams({ key: "Query", value: searchValue }));
  }, 1000);

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
          <Filters />
        </div>
        <div className={`xl:w-8/10 lg:w-7/10 w-full flex flex-col gap-8`}>
          <div
            className={`bg-default-light rounded-[15px] shadow-[0px_2px_5px_0_#000000]/15 dark:shadow-[0px_2px_5px_0_#ffffff]/15 sm:p-4 px-4 py-1 flex items-center justify-between`}
          >
            <div
              className={`md:w-3/10 sm:w-4/10 w-6/10 bg-default-light shadow-[0px_2px_5px_0px_#000000]/15 dark:shadow-[0px_2px_5px_0px_#ffffff]/15 rounded-[15px] py-2 px-2 flex items-center justify-between lg:hidden`}
            >
              <input
                className={`sm:text-base text-[12px] font-normal text-field-silver placeholder:text-field-silver outline-none w-9/10`}
                placeholder={t("courses.filters.searchPlaceHolder")}
                type="text"
                onChange={(event) => handleSearch(event.target.value)}
              />
              <Search
                className={`w-1/10 ${lang === "en" ? "transform-[rotate(90deg)]" : "transform-[rotate(0deg)]"}`}
                color="#848484"
              />
            </div>
            <div className={`lg:flex hidden items-center gap-4`}>
              <span className={`text-default-black font-normal md:text-base`}>
                {t("courses.sorting.sortBy")}
              </span>
              <SelectModal
                items={sortingTypes}
                contentPosition={"popper"}
                contentClassName={`min-w-full! relative! z-100! ${theme ? `bg-[#1e1e1e] text-white` : `bg-white text-[#1E1E1E]`}`}
                defaultValue={"expensive"}
                itemClassName={`cursor-pointer! ${theme ? `focus:bg-[oklch(0.269_0_0)]` : `focus:bg-muted`}`}
                triggerClassName={`border! border-light-gray! rounded-[15px] flex! items-center! gap-1! ring-0! px-4! py-2! h-auto! font-normal! text-[14px]! text-default-black! cursor-pointer! bg-default-light!`}
                value={sortTypes}
                setValue={setSortTypes}
                onValueChange={(event) => {
                  setSortTypes(event);
                  const sort = sortingTypes.find(
                    (value) => event === value.name,
                  );
                  dispatch(
                    updateParams({ key: "SortingCol", value: sort.sortCol }),
                  );
                  dispatch(
                    updateParams({ key: "SortType", value: sort.sortType }),
                  );
                }}
              />
              <SelectModal
                items={rowsOfPages}
                contentPosition={"popper"}
                contentClassName={`min-w-full! relative! z-100! ${theme ? `bg-[#1e1e1e] text-white` : `bg-white text-[#1E1E1E]`}`}
                defaultValue={12}
                itemClassName={`cursor-pointer! ${theme ? `focus:bg-[oklch(0.269_0_0)]` : `focus:bg-muted`}`}
                triggerClassName={`border! border-light-gray! rounded-[15px] flex! items-center! gap-1! ring-0! px-4! py-2! h-auto! font-normal! text-[14px]! text-default-black! cursor-pointer! bg-default-light!`}
                value={rowPageCount}
                setValue={setRowPageCount}
                onValueChange={(event) => {
                  setRowPageCount(event);
                  dispatch(updateParams({ key: "RowsOfPage", value: event }));
                }}
              />
            </div>
            <View view={gridView} setView={setGridView} />
            <div className="block lg:hidden">
              <DrawerComponents
                direction="bottom"
                theme={theme}
                trigger={
                  <>
                    <div
                      className={`px-3 py-2 sm:block lg:hidden hidden bg-green-primary text-white font-bold rounded-[100px] text-base cursor-pointer`}
                    >
                      {t("courses.filters.filtersName")}
                    </div>
                    <div
                      className={`p-3 bg-green-primary rounded-full w-fit cursor-pointer sm:hidden block`}
                    >
                      <ListFilterPlus
                        className={`size-5 sm:size-6`}
                        color="#ffffff"
                      />
                    </div>
                  </>
                }
                contentClassName={`${theme ? `bg-[#1e1e1e] border-[#0f0f0f]` : `bg-white border-[#f5f5f5]`} w-full`}
                primitiveClassName={`${theme ? `bg-[#0f0f0f]` : `bg-[#f5f5f5]`}`}
              >
                <div
                  className={`flex flex-col gap-5 no-scrollbar overflow-y-auto p-4 lg:hidden`}
                >
                  <div className={`flex items-center justify-between`}>
                    <span className={`text-default-black text-[20px]`}>
                      {t("courses.filters.filtersName")}
                    </span>
                    <DrawerClose asChild>
                      <div
                        className={`px-2 py-1 font-bold text-red-error text-[14px] rounded-[64px] border border-red-error w-fit cursor-pointer`}
                      >
                        {t("courses.filters.closeBtn")}
                      </div>
                    </DrawerClose>
                  </div>
                  <Filters
                    sortTypes={sortTypes}
                    setSortTypes={setSortTypes}
                    rowPageCount={rowPageCount}
                    setRowPageCount={setRowPageCount}
                  />
                </div>
              </DrawerComponents>
            </div>
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
              className={`cursor-pointer sm:size-12.5 size-10 bg-light-gray rounded-[15px] shadow-[0px_2px_5px_0px_#000000]/15 flex items-center justify-center sm:text-[18px] text-[14px] font-normal`}
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
                className={`cursor-pointer sm:size-12.5 size-10 bg-light-gray rounded-[15px] shadow-[0px_2px_5px_0px_#000000]/15 flex items-center justify-center sm:text-[18px] text-[14px] font-normal`}
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
              className={`cursor-pointer sm:size-12.5 size-10 bg-light-gray rounded-[15px] shadow-[0px_2px_5px_0px_#000000]/15 flex items-center justify-center sm:text-[18px] text-[14px] font-normal`}
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
