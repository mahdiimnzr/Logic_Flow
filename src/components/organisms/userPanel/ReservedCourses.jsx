import ThemeContext from "@/app/context/ThemeContext";
import Badge from "@/components/atoms/Badge/Badge";
import Button from "@/components/atoms/Buttons/Button";
import ImageFallback from "@/components/atoms/ImageFallBack/ImageFallBack";
import PaginationComponents from "@/components/molecules/Pagination/Pagination";
import SelectModal from "@/components/molecules/Select/Select";
import { PaginationEllipsis, PaginationItem } from "@/components/ui/pagination";
import { rowsOfPages } from "@/core/constants/courseSortings";
import CalenderIcon from "@/core/icons/CalenderIcon";
import LoadingSvg from "@/core/icons/LoadingSvg";
import TeachersCardIcon from "@/core/icons/TeachersCardIcon";
import {
  deleteCourseReserve,
  useGetMyReserveCourses,
  useGetUserDetail,
} from "@/core/services/api/userPanel/userPanel.service";
import formatDate from "@/core/utils/formatDate";
import { useI18n } from "@/i18n/useI18n";
import debounce from "debounce";
import { EyeIcon, Search, Trash, X } from "lucide-react";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import courseImage from "../../../assets/images/coursePng.png";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const filtersItems = [
  {
    name: "reserved",
    title: "رزرو شده",
    titleEn: "Reserved",
  },
  {
    name: "unreserved",
    title: "در انتظار تایید",
    titleEn: "Awaiting approval",
  },
  {
    name: "all",
    title: "همه",
    titleEn: "All",
  },
];

const ReservedCourses = () => {
  const { t, lang } = useI18n();
  const { theme } = useContext(ThemeContext);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const view = true;
  const [filter, setFilter] = useState(null);
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [rowPageCount, setRowPageCount] = useState(8);
  const [whichPage, setWhichPage] = useState(1);
  const [deleteFiltersShow, setDeleteFiltersShow] = useState(false);

  const { isLoading, data: reservedCourses } = useGetMyReserveCourses();
  const { data: userDetail } = useGetUserDetail();

  const { mutate: deleteReserveMutate } = useMutation({
    mutationFn: (id) =>
      toast.promise(deleteCourseReserve(id), {
        pending: "در حال حذف دوره",
        success: {
          render({ data }) {
            return data.data.message;
          },
        },
        error: {
          render({ data }) {
            return data.data.message;
          },
        },
      }),
    onSuccess: (response) => {
      if (response.data.success) {
        queryClient.invalidateQueries({ queryKey: ["MyReserveCourses"] });
      } else if (!response.data.success) {
        toast.error(response.data.message);
      }
    },
  });

  const handleDeleteFiltersShow = useCallback(() => {
    if ((filter === null || filter === "all") && inputValue === "") {
      setDeleteFiltersShow(false);
    } else {
      setDeleteFiltersShow(true);
    }
  }, [filter, inputValue]);
  const handleDeleteFilters = () => {
    setInputValue("");
    setDebouncedSearch("");
    setFilter("all");
  };

  const displayData = useMemo(() => {
    if (!Array.isArray(reservedCourses?.data)) return [];
    if (debouncedSearch.trim() === "" && filter === "reserved")
      return reservedCourses.data.filter((value) => value.accept);
    else if (debouncedSearch.trim() !== "" && filter === "reserved") {
      const filterData = reservedCourses.data.filter((value) => value.accept);
      return filterData.filter((value) =>
        value.courseName.toLowerCase().includes(debouncedSearch.toLowerCase()),
      );
    }
    if (debouncedSearch.trim() === "" && filter === "unreserved")
      return reservedCourses.data.filter((value) => !value.accept);
    else if (debouncedSearch.trim() !== "" && filter === "unreserved") {
      const filterData = reservedCourses.data.filter((value) => !value.accept);
      return filterData.filter((value) =>
        value.courseName.toLowerCase().includes(debouncedSearch.toLowerCase()),
      );
    }
    if (debouncedSearch.trim() === "") return reservedCourses.data;
    else {
      return reservedCourses.data.filter((value) =>
        value.courseName.toLowerCase().includes(debouncedSearch.toLowerCase()),
      );
    }
  }, [debouncedSearch, reservedCourses, filter]);

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
    if (reservedCourses?.data?.success == false) {
      navigate("/UserPanel/Dashboard");
      toast.error(reservedCourses?.data?.message);
    }
  }, [isLoading]);
  useEffect(() => {
    handleDeleteFiltersShow();
  }, [handleDeleteFiltersShow]);
  useEffect(() => {
    if (pageCount < whichPage) {
      setWhichPage(1);
      window.scroll(0, 0);
    }
  }, [pageCount, whichPage]);
  return isLoading ? (
    <LoadingSvg className={`h-full!`} />
  ) : (
    <div className={`flex flex-col gap-10 h-full`}>
      <div className={`flex justify-between`}>
        <div
          className={`flex justify-between sm:justify-normal items-center gap-4 sm:w-6/10 w-full`}
        >
          <div
            className={`sm:w-6/10 w-9/10 flex items-center justify-between h-12 bg-default-light border border-light-gray rounded-[16px] px-4`}
          >
            <input
              className={`w-9/10 outline-none text-field-silver placeholder:text-field-silver text-base font-normal`}
              type="text"
              placeholder={t("userPanel.reservedSection.searchPlaceHolder")}
              value={inputValue}
              onChange={(event) => {
                setInputValue(event.target.value);
                debouncedFn(event.target.value);
              }}
            />
            <Search className={`size-4`} color="#848484" />
          </div>
          {deleteFiltersShow && (
            <Button
              onClick={handleDeleteFilters}
              color={"authBtn"}
              className={`p-2 flex items-center justify-center gap-1`}
            >
              <p className={`hidden xl:block`}>
                {t("courses.filters.deleteFilter")}
              </p>
              <X className={`block`} />
            </Button>
          )}
        </div>
        <div className={`sm:block hidden`}>
          <SelectModal
            items={filtersItems}
            contentPosition={"popper"}
            contentClassName={`min-w-fit! ${theme ? `bg-[#1e1e1e] text-white` : `bg-white text-[#1E1E1E]`}`}
            itemClassName={`${theme ? `focus:bg-[oklch(0.269_0_0)]` : `focus:bg-muted`} h-8! cursor-pointer!`}
            value={filter ?? undefined}
            triggerClassName={`xl:px-4! px-3! text-default-black! font-normal text-base! xl:h-12! h-10! rounded-[16px]! cursor-pointer bg-default-light! ring-0! border border-light-gray`}
            setValue={setFilter}
            onValueChange={setFilter}
            placeHolder={t("userPanel.reservedSection.filters")}
          />
        </div>
      </div>
      <div
        className={`sm:bg-default-light sm:border border-light-gray rounded-[24px] h-full flex flex-col justify-between gap-4 pb-8`}
      >
        <div className={`flex flex-col gap-5 sm:hidden`}>
          {currentPageData?.map((value, index) => (
            <div
              dir="rtl"
              key={index}
              className={`rounded-[20px] ${view ? null : `flex items-center gap-8 p-4`} bg-default-light relative overflow-hidden w-full transition-all shadow-[0px_4px_4px_0px_#000000]/0 hover:shadow-cards-hover`}
            >
              <div
                className={`absolute z-10 ${view ? `right-4 top-4` : `lg:right-8 lg:top-8 top-9 right-5`} content-center bg-default-black/25 size-10 rounded-full cursor-pointer`}
              >
                <Trash
                  className="xl:size-5 size-6 cursor-pointer mx-auto"
                  color="#ffffff"
                  onClick={() => deleteReserveMutate({ id: value.reserveId })}
                />
              </div>
              <Link
                to={`/Courses/Detail/${value.courseId}/Review`}
                className={`rounded-[12px] group content-center block relative ${view ? `lg:h-60 sm:h-50 h-45` : `2xl:w-4/10 lg:w-3/10 w-4/10 2xl:h-40 lg:h-50 h-35 overflow-hidden`}`}
              >
                <ImageFallback
                  src={value.image}
                  fallback={courseImage}
                  className={`${!view ? `group-hover:transform-[scale(1)]` : `group-hover:transform-[scale(1.2)]`} transform-[scale(1.5)] size-full transition-all cursor-pointer mx-auto absolute inset-0 object-cover`}
                />
              </Link>
              <div
                className={`rounded-[20px] bg-default-light flex flex-col gap-7 relative ${view ? `p-4` : `2xl:w-6/10 w-7/10`}`}
              >
                <div className={`flex flex-col gap-2 text-default-black`}>
                  <h3 className={`text-base font-bold truncate`}>
                    {value.courseName}
                  </h3>
                </div>
                <div className={`flex flex-col gap-2`}>
                  <div className={`flex items-center justify-between`}>
                    <div className={`flex items-center gap-1`}>
                      <TeachersCardIcon />
                      <span
                        className={`text-field-silver text-[12px] font-normal`}
                      >
                        {userDetail?.data?.fName} {userDetail?.data?.lName}
                      </span>
                    </div>
                    <Badge
                      color={value.accept ? "panelAccept" : "panelDecline"}
                      className={`px-3 py-0.5 xl:text-base! text-[14px]`}
                    >
                      {value.accept
                        ? t("userPanel.reservedSection.reserved")
                        : t("userPanel.reservedSection.unreserved")}
                    </Badge>
                  </div>
                  <div className={`flex items-center justify-between`}>
                    <div className={`flex items-center gap-1`}>
                      <CalenderIcon />
                      <span
                        className={`text-field-silver text-[12px] font-normal`}
                      >
                        {formatDate(value.insertDate)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <table className={`min-w-full sm:table hidden`}>
          <thead className={`h-16`}>
            <tr>
              <th
                className={`text-default-black font-semibold xl:text-base text-[14px] ${lang === "en" ? "pl-6 text-left" : "pr-6 text-right"} border-b border-light-gray`}
              >
                {t("userPanel.reservedSection.courseName")}
              </th>
              <th
                className={`text-default-black text-center font-semibold xl:text-base text-[14px] border-b border-light-gray`}
              >
                {t("userPanel.reservedSection.studentName")}
              </th>
              <th
                className={`text-default-black text-center font-semibold xl:text-base text-[14px] border-b border-light-gray`}
              >
                {t("userPanel.reservedSection.reserveStatus")}
              </th>
              <th
                className={`text-default-black text-center font-semibold xl:text-base text-[14px] border-b border-light-gray`}
              >
                {t("userPanel.reservedSection.reserveDate")}
              </th>
              <th
                className={`text-default-black font-semibold xl:text-base text-[14px] ${lang === "en" ? "pr-6 text-right" : "pl-6 text-left"} border-b border-light-gray`}
              >
                {t("userPanel.reservedSection.actions")}
              </th>
            </tr>
          </thead>
          <tbody>
            {currentPageData?.map((value, index) => (
              <tr key={index}>
                <td className="xl:w-80 w-35 border-b border-light-gray py-3 text-default-black">
                  <div
                    className={`xl:max-w-80 max-w-35 flex items-center justify-start xl:gap-4 gap-2 ${lang === "en" ? "xl:pl-6 pl-3" : "xl:pr-6 pr-3"}`}
                  >
                    <ImageFallback
                      className="size-8 rounded-full shrink-0"
                      src={value.image}
                      fallback={courseImage}
                    />
                    <span className="truncate xl:max-w-80 max-w-35 xl:text-base text-[14px] font-normal">
                      {value.courseName}
                    </span>
                  </div>
                </td>
                <td className="border-b border-light-gray py-3 text-center xl:text-base text-[14px] font-normal text-default-black whitespace-nowrap">
                  {userDetail?.data?.fName} {userDetail?.data?.lName}
                </td>
                <td className="border-b text-center border-light-gray py-3">
                  <Badge
                    color={value.accept ? "panelAccept" : "panelDecline"}
                    className={`px-3 py-0.5 xl:text-base! text-[14px]`}
                  >
                    {value.accept
                      ? t("userPanel.reservedSection.reserved")
                      : t("userPanel.reservedSection.unreserved")}
                  </Badge>
                </td>
                <td className="border-b border-light-gray py-3 text-center xl:text-base text-[14px] font-normal text-default-black whitespace-nowrap">
                  {formatDate(value.insertDate)}
                </td>
                <td
                  className={`border-b w-10 border-light-gray py-3 ${lang === "en" ? "xl:pr-6 pr-3" : "xl:pl-6 pl-3"}`}
                >
                  <div className="flex items-center justify-end gap-2">
                    <Tooltip>
                      <TooltipTrigger>
                        <Link to={`/Courses/Detail/${value.courseId}/Review`}>
                          <EyeIcon
                            className="xl:size-5 size-4"
                            color="#008C78"
                          />
                        </Link>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p> {t("userPanel.tooltip.eye")}</p>
                      </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                      <TooltipTrigger>
                        <Trash
                          className="xl:size-5 size-4 cursor-pointer mx-auto"
                          color="#008C78"
                          onClick={() =>
                            deleteReserveMutate({ id: value.reserveId })
                          }
                        />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p> {t("userPanel.tooltip.Delete")}</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {currentPageData.length == 0 && (
          <span
            className={`text-[14px] font-semibold text-default-black text-center`}
          >
            {t("userPanel.dashboardSection.notFound")}
          </span>
        )}
        <div className={`flex items-center justify-between px-8`}>
          <div className={`w-fit mx-auto sm:mx-0`}>
            <PaginationComponents
              length={pageArray.length}
              titleButtons={true}
              prevOnClick={() => {
                const firstPage = pageArray[0];
                whichPage !== firstPage && goToPage(whichPage - 1);
              }}
              nextOnClick={() => {
                const lastPage = pageArray[pageArray.length - 1];
                whichPage !== lastPage && goToPage(whichPage + 1);
              }}
              itemsClassName="w-fit flex gap-2 items-center cursor-pointer xl:text-base text-[14px]"
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
                    key={item}
                    isActive={whichPage === item}
                    onClick={() => goToPage(item)}
                    className="cursor-pointer size-7 rounded-full flex items-center justify-center"
                  >
                    {item}
                  </PaginationItem>
                );
              })}
            </PaginationComponents>
          </div>
          <div className={`sm:block hidden`}>
            <SelectModal
              items={rowsOfPages}
              contentPosition={"popper"}
              contentClassName={`min-w-fit! ${theme ? `bg-[#1e1e1e] text-white` : `bg-white text-[#1E1E1E]`}`}
              itemClassName={`${theme ? `focus:bg-[oklch(0.269_0_0)]` : `focus:bg-muted`} h-8! cursor-pointer!`}
              value={undefined}
              triggerClassName={`xl:px-4! px-3! text-default-black! font-normal xl:text-base! text-[14px]! xl:h-12! h-10! rounded-[16px]! cursor-pointer bg-default-light! ring-0! border border-light-gray`}
              setValue={setRowPageCount}
              onValueChange={setRowPageCount}
              placeHolder={t("userPanel.reservedSection.rowsNumber")}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservedCourses;
