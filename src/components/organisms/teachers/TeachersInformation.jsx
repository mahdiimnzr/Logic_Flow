import ThemeContext from "@/app/context/ThemeContext";
import Button from "@/components/atoms/Buttons/Button";
import TeachersCard from "@/components/molecules/Cards/TeachersCard";
import PaginationComponents from "@/components/molecules/Pagination/Pagination";
import SelectModal from "@/components/molecules/Select/Select";
import { PaginationEllipsis, PaginationItem } from "@/components/ui/pagination";
import { Skeleton } from "@/components/ui/skeleton";
import { rowsOfPages } from "@/core/constants/articlesSorting";
import { useGetTeachers } from "@/core/services/api/teachers/teacher.service";
import { useI18n } from "@/i18n/useI18n";
import debounce from "debounce";
import { ChevronLeft, Search } from "lucide-react";
import { useContext, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

const TeachersInformation = () => {
  const { t, lang } = useI18n();
  const { theme } = useContext(ThemeContext);
  const skeletonCount = new Array(10).fill("");
  const { isLoading, data: Teachers } = useGetTeachers();
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [rowPageCount, setRowPageCount] = useState(12);
  const [whichPage, setWhichPage] = useState(1);

  const displayData = useMemo(() => {
    if (!Teachers?.data) return [];
    if (debouncedSearch.trim() === "") return Teachers.data;
    return Teachers.data.filter((value) =>
      value.fullName.toLowerCase().includes(debouncedSearch.toLowerCase()),
    );
  }, [debouncedSearch, Teachers]);

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

  const goToPage = (value) => {
    setWhichPage(value);
    window.scroll(0, 0);
  };

  const debouncedFn = useMemo(() => {
    return debounce((value) => {
      setDebouncedSearch(value);
      setWhichPage(1);
    }, 1000);
  }, []);
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
          <Link className={`text-[14px] font-normal text-green-primary`}>
            {t("teachers.teacher")}
          </Link>
        </div>
        <span className={`text-default-black md:text-[32px] font-bold`}>
          {t("teachers.teacher")}
        </span>
      </div>
      <div className={`w-full flex flex-col gap-8`}>
        <div
          className={`bg-default-light rounded-[15px] shadow-[0px_2px_5px_0_#000000]/15 dark:shadow-[0px_2px_5px_0_#ffffff]/15 p-3 flex items-center justify-between`}
        >
          <div className={`flex items-center lg:gap-5.5 gap-4`}>
            <div
              className={`xl:w-162 lg:w-140 sm:w-118 flex justify-between border border-light-gray p-3 rounded-[15px]`}
            >
              <input
                type="text"
                placeholder={t("teachers.inputPlaceHolder")}
                className={`text-base font-normal text-field-silver placeholder:text-field-silver outline-none w-8/10`}
                onChange={(event) => {
                  debouncedFn(event.target.value);
                }}
              />
              <Search
                className={`w-0.5/10 ${lang === "en" ? "transform-[rotate(90deg)]" : "transform-[rotate(0deg)]"}`}
                color="#848484"
              />
            </div>
            <div className={`flex items-center lg:gap-4 gap-2`}>
              <span
                className={`text-default-black font-normal lg:text-base md:text-[14px] lg:block hidden`}
              >
                {t("teachers.pagination")}
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
            className={`lg:w-[125px] lg:h-[46px] w-[90px] h-[45px] lg:text-[14px] md:text-[12px] text-default-light md:block hidden`}
          >
            {t("teachers.searchBtn")}
          </Button>
        </div>
      </div>
      {isLoading ? (
        <div
          className={`w-full grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8`}
        >
          {skeletonCount?.map((_, index) => (
            <div
              key={index}
              dir="rtl"
              className={`w-full p-5 flex flex-col items-center gap-5 rounded-[20px] bg-field-silver`}
            >
              <Skeleton className={`h-55 w-full`} />
              <Skeleton className={`h-7 w-5/10`} />
              <Skeleton className={`h-14 w-7/10`} />
            </div>
          ))}
        </div>
      ) : (
        <div
          className={`w-full grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8`}
        >
          {currentPageData.map((value, index) => (
            <TeachersCard
              key={index}
              fullName={value.fullName}
              courseCounts={value.courseCounts}
              teacherId={value.teacherId}
              pictureAddress={value.pictureAddress}
              linkdinProfileLink={value.linkdinProfileLink}
            />
          ))}
        </div>
      )}
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
  );
};

export default TeachersInformation;
