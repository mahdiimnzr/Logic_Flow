import ThemeContext from "@/app/context/ThemeContext";
import Button from "@/components/atoms/Buttons/Button";
import TeachersCard from "@/components/molecules/Cards/TeachersCard";
import SelectModal from "@/components/molecules/Select/Select";
import { rowsOfPages } from "@/core/constants/articlesSorting";
import { useGetTeachersDetail } from "@/core/services/api/techerDetail/techerDetail.service";
import { useI18n } from "@/i18n/useI18n";
import { ChevronLeft, Search } from "lucide-react";
import { useContext, useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Tilt from "react-parallax-tilt";
import useFavoriteCourse from "@/core/services/api/hooks/useFavoriteCourses";
import course from "../../../assets/images/coursePng.png";
import FavoriteIcon from "@/core/icons/FavoriteIcon";
import ImageFallback from "@/components/atoms/ImageFallBack/ImageFallBack";
import debounce from "debounce";
import PaginationComponents from "@/components/molecules/Pagination/Pagination";
import { PaginationEllipsis, PaginationItem } from "@/components/ui/pagination";
import { Skeleton } from "@/components/ui/skeleton";

const TeacherDetail = () => {
  const { id } = useParams();
  const { t, lang } = useI18n();
  const skeletonCount = new Array(8).fill("");
  const [view, setView] = useState(true);
  const { theme } = useContext(ThemeContext);
  const { addFavoriteCourseMutate } = useFavoriteCourse();
  const { isLoading, data: TeachersDetail } = useGetTeachersDetail(id);
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [rowPageCount, setRowPageCount] = useState(12);
  const [whichPage, setWhichPage] = useState(1);

  const displayData = useMemo(() => {
    if (!TeachersDetail?.data?.courses) return [];
    if (debouncedSearch.trim() === "") return TeachersDetail.data.courses;
    return TeachersDetail.data.courses.filter((value) =>
      value.title.toLowerCase().includes(debouncedSearch.toLowerCase()),
    );
  }, [debouncedSearch, TeachersDetail]);

  const pageCount = useMemo(
    () =>
      displayData.length ? Math.ceil(displayData.length / rowPageCount) : 1,
    [displayData.length, rowPageCount],
  );

  const pageArray = useMemo(() => {
    const pages = [];
    for (let index = 1; index <= pageCount; index++) pages.push(index);
    return pages;
  }, [pageCount]);

  const visiblePages = useMemo(() => {
    if (pageCount <= 4) {
      const pages = [];
      for (let i = 1; i <= pageCount; i++) {
        pages.push(i);
      }
      return pages;
    }

    const pages = [];
    pages.push(1);
    if (whichPage > 3) {
      pages.push("left-ellipsis");
    }
    const start = Math.max(2, whichPage - 1);
    const end = Math.min(pageCount - 1, whichPage + 1);
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    if (whichPage < pageCount - 2) {
      pages.push("right-ellipsis");
    }
    pages.push(pageCount);

    return pages;
  }, [whichPage, pageCount]);

  const currentPageData = useMemo(() => {
    const start = (whichPage - 1) * rowPageCount;
    return displayData.slice(start, start + rowPageCount);
  }, [displayData, whichPage, rowPageCount]);

  const debouncedFn = useMemo(() => {
    return debounce((value) => {
      setDebouncedSearch(value);
      setWhichPage(1);
    }, 1000);
  }, []);

  const goToPage = (value) => {
    setWhichPage(value);
    window.scroll(0, 0);
  };
  useEffect(() => {
    if (pageCount < whichPage) {
      setWhichPage(1);
      window.scroll(0, 0);
    }
  }, [pageCount, whichPage]);
  return (
    <div className={`flex flex-col gap-8.5 items-center`}>
      <div className={`flex flex-col items-center gap-4`}>
        <div className={`flex items-center justify-center gap-1`}>
          <Link
            className={`text-[14px] font-normal text-green-primary`}
            to={"/"}
          >
            {t("teachers.home")}
          </Link>
          <ChevronLeft
            className={`size-4 ${lang === "en" ? "transform-[rotate(180deg)]" : "transform-[rotate(0deg)]"}`}
            color="#008C78"
          />
          <Link
            className={`text-[14px] font-normal text-green-primary`}
            to={"/Teachers"}
          >
            {t("teacherDetail.teacher")}
          </Link>
          <ChevronLeft
            className={`size-4 ${lang === "en" ? "transform-[rotate(180deg)]" : "transform-[rotate(0deg)]"}`}
            color="#008C78"
          />
          <Link className={`text-[14px] font-normal text-green-primary`}>
            {TeachersDetail?.data?.fullName}
          </Link>
        </div>
        <span className={`text-default-black md:text-[32px] font-bold`}>
          {TeachersDetail?.data?.fullName}
        </span>
      </div>
      <div
        className={`flex lg:flex-row flex-col lg:items-start items-center w-full xl:gap-12 gap-8`}
      >
        <div className={`lg:w-2/11 md:w-9/11 w-full`}>
          {isLoading ? (
            <div
              dir="rtl"
              className={`w-full p-5 flex flex-col items-center gap-5 rounded-[20px] bg-field-silver`}
            >
              <Skeleton className={`h-55 w-full`} />
              <Skeleton className={`h-7 w-5/10`} />
              <Skeleton className={`h-14 w-7/10`} />
            </div>
          ) : (
            <TeachersCard
              isFromDetail={true}
              fullName={TeachersDetail?.data?.fullName}
              courseCounts={TeachersDetail?.data?.courseCounts ?? 0}
              teacherId={TeachersDetail?.data?.teacherId}
              pictureAddress={TeachersDetail?.data?.pictureAddress}
              linkdinProfileLink={TeachersDetail?.data?.linkdinProfileLink}
            />
          )}
        </div>
        <div className={`lg:w-9/11 w-full flex flex-col gap-7`}>
          <div
            className={`bg-default-light rounded-[15px] shadow-[0px_2px_5px_0_#000000]/15 dark:shadow-[0px_2px_5px_0_#ffffff]/15 p-3 flex items-center justify-between`}
          >
            <div className={`flex items-center lg:gap-5.5 gap-4`}>
              <div
                className={`xl:w-130 lg:w-95 sm:w-85 flex justify-between border border-light-gray p-3 rounded-[15px]`}
              >
                <input
                  type="text"
                  placeholder={t("teacherDetail.inputPlaceHolder")}
                  className={`text-base font-normal text-field-silver placeholder:text-field-silver outline-none w-8/10`}
                  value={inputValue}
                  onChange={(event) => {
                    setInputValue(event.target.value);
                    debouncedFn(event.target.value);
                  }}
                />
                <Search
                  className={`w-0.5/10 ${lang === "en" ? "transform-[rotate(90deg)]" : "transform-[rotate(0deg)]"}`}
                  color="#848484"
                />
              </div>
              <div className={`flex items-center xl:gap-4 gap-2`}>
                <span
                  className={`text-default-black font-normal lg:text-base md:text-[14px] md:block hidden`}
                >
                  {t("teacherDetail.pagination")}
                </span>
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
                  }}
                />
              </div>
            </div>
            <Button
              color={"searchBtn"}
              className={`lg:w-[125px] lg:h-[46px] w-[90px] h-[45px] lg:text-[14px] md:text-[12px] text-default-light sm:block hidden`}
            >
              {t("teacherDetail.searchBtn")}
            </Button>
          </div>
          <div
            className={`w-full grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8`}
          >
            {isLoading
              ? skeletonCount?.map((_, index) => (
                  <div
                    key={index}
                    dir="rtl"
                    className={`w-full p-5 flex flex-col gap-5 rounded-[20px] bg-field-silver`}
                  >
                    <Skeleton className={`h-55 w-full`} />
                    <Skeleton className={`h-7 w-5/10`} />
                    <Skeleton className={`h-14 w-7/10`} />
                  </div>
                ))
              : currentPageData.map((value, index) => (
                  <Tilt key={index} tiltAxis={!view && "disable"}>
                    <div
                      dir="rtl"
                      className={`rounded-[20px] ${view ? null : `flex items-center gap-8 p-4`} bg-default-light relative overflow-hidden w-full transition-all shadow-[0px_4px_4px_0px_#000000]/0 hover:shadow-cards-hover`}
                    >
                      <div
                        onClick={() =>
                          addFavoriteCourseMutate({ courseId: value.courseId })
                        }
                        className={`absolute z-10 ${view ? `right-4 top-4` : `lg:right-8 lg:top-8 top-9 right-5`} content-center bg-default-black/25 size-10 rounded-full cursor-pointer`}
                      >
                        <FavoriteIcon
                          isFavorite={false}
                          className={`mx-auto`}
                        />
                      </div>
                      <Link
                        to={`/Courses/Detail/${value.courseId}/Review`}
                        className={`rounded-[12px] group content-center block relative ${view ? `lg:h-60 sm:h-50 h-45` : `2xl:w-4/10 lg:w-3/10 w-4/10 2xl:h-40 lg:h-50 h-35 overflow-hidden`}`}
                      >
                        <ImageFallback
                          src={value.imageAddress}
                          fallback={course}
                          className={`${!view ? `group-hover:transform-[scale(1)]` : `group-hover:transform-[scale(1.2)]`} transform-[scale(1.5)] size-full transition-all cursor-pointer mx-auto absolute inset-0 object-cover`}
                        />
                      </Link>
                      <div
                        className={`rounded-[20px] bg-default-light flex flex-col gap-7 relative ${view ? `p-4` : `2xl:w-6/10 w-7/10`}`}
                      >
                        <div
                          className={`flex flex-col gap-2 text-default-black`}
                        >
                          <h3 className={`text-base font-bold truncate`}>
                            {value.title}
                          </h3>
                          <p
                            className={`text-[14px] font-normal h-10.5 line-clamp-2`}
                          >
                            {value.miniDescribe}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Tilt>
                ))}
          </div>
          {currentPageData.length == 0 && (
            <span
              className={`text-[24px] font-semibold text-default-black text-center`}
            >
              {t("userPanel.dashboardSection.notFound")}
            </span>
          )}
          <PaginationComponents
            length={pageArray.length}
            prevOnClick={() => {
              const firstPage = pageArray[0];
              whichPage !== firstPage && goToPage(whichPage - 1);
            }}
            nextOnClick={() => {
              const lastPage = pageArray[pageArray.length - 1];
              whichPage !== lastPage && goToPage(whichPage + 1);
            }}
          >
            {visiblePages.map((item, index) => {
              if (typeof item === "string") {
                return (
                  <PaginationItem key={item + index}>
                    <PaginationEllipsis />
                  </PaginationItem>
                );
              }

              return (
                <PaginationItem
                  key={index}
                  onClick={() => goToPage(item)}
                  className={`cursor-pointer sm:size-12.5 size-8 bg-light-gray sm:rounded-[15px] rounded-[10px] shadow-[0px_2px_5px_0px_#000000]/15 flex items-center justify-center sm:text-[18px] text-[14px] font-normal`}
                  isActive={whichPage !== item ? false : true}
                >
                  {item}
                </PaginationItem>
              );
            })}
          </PaginationComponents>
        </div>
      </div>
    </div>
  );
};

export default TeacherDetail;
