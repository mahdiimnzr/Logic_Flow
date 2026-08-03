import ThemeContext from "@/app/context/ThemeContext";
import SelectModal from "@/components/molecules/Select/Select";
import LoadingSvg from "@/core/icons/LoadingSvg";
import {
  addAbsentStatus,
  useGetMyClasses,
} from "@/core/services/api/userPanel/userPanel.service";
import { useI18n } from "@/i18n/useI18n";
import { EyeIcon, UserCheck, UserX, X } from "lucide-react";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import formatDate from "@/core/utils/formatDate";
import { useNavigate } from "react-router-dom";
import Badge from "@/components/atoms/Badge/Badge";
import debounce from "debounce";
import PaginationComponents from "@/components/molecules/Pagination/Pagination";
import { PaginationEllipsis, PaginationItem } from "@/components/ui/pagination";
import { rowsOfPages } from "@/core/constants/courseSortings";
import Button from "@/components/atoms/Buttons/Button";
import { toast } from "react-toastify";
import { TourProvider, useTour } from "@reactour/tour";
import { useTourControl } from "@/components/molecules/TourStep/TourProvider";
import { getTourStyles } from "@/components/molecules/TourStep/tourStyles";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import MyClassDetail from "./MyClasses/MyClassDetail";
import AbsentModal from "./MyClasses/AbsentModal";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const filtersItems = [
  {
    name: "paidCourses",
    title: "باز",
    titleEn: "Open",
  },
  {
    name: "unPaidCourses",
    title: "بسته",
    titleEn: "Close",
  },
  {
    name: "all",
    title: "همه",
    titleEn: "All",
  },
];

const MyClassesContent = () => {
  const queryClient = useQueryClient();
  const { openRef } = useTourControl();
  const { setIsOpen, setSteps } = useTour();

  const { t, lang } = useI18n();
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();

  const view = true;
  const [detailModal, setDetailModal] = useState(false);
  const [absentModal, setAbsentModal] = useState(false);
  const [filter, setFilter] = useState(null);
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [rowPageCount, setRowPageCount] = useState(8);
  const [whichPage, setWhichPage] = useState(1);
  const [deleteFiltersShow, setDeleteFiltersShow] = useState(false);
  const [courseReceiptProps, setCourseReceiptProps] = useState({
    SessionId: "",
  });

  const { isLoading, data: myClasses } = useGetMyClasses("MyCoursesList");

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

  const handleDetailModal = (values) => {
    setDetailModal(true);
    setCourseReceiptProps({
      SessionId: values.id,
    });
  };
  const handleAbsentModal = (values) => {
    setAbsentModal(true);
    setCourseReceiptProps({
      SessionId: values.id,
    });
  };

  useEffect(() => {
    openRef.current = setIsOpen;
    setSteps([
      {
        selector: '[data-tour="step1"]',
        content: t("userPanel.myClass.step1"),
      },
    ]);
  }, [t]);

  const { mutate: absentStatusMutate } = useMutation({
    mutationFn: (params) =>
      toast.promise(addAbsentStatus(params), {
        pending: "در حال ثبت وضعیت",
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
        queryClient.invalidateQueries({
          queryKey: ["MyClasses"],
        });
      } else if (!response.data.success) {
        toast.error(response.data.message);
      }
    },
  });

  const displayData = useMemo(() => {
    if (!Array.isArray(myClasses?.data)) return [];
    if (debouncedSearch.trim() === "" && filter === "paidCourses")
      return myClasses.data.filter((value) => value.AP);
    else if (debouncedSearch.trim() !== "" && filter === "paidCourses") {
      const filterData = myClasses.data.filter((value) => value.AP);
      return filterData.filter((value) =>
        value.courseTitle.toLowerCase().includes(debouncedSearch.toLowerCase()),
      );
    }
    if (debouncedSearch.trim() === "" && filter === "unPaidCourses")
      return myClasses.data.filter((value) => !value.AP);
    else if (debouncedSearch.trim() !== "" && filter === "unPaidCourses") {
      const filterData = myClasses.data.filter((value) => !value.AP);
      return filterData.filter((value) =>
        value.courseTitle.toLowerCase().includes(debouncedSearch.toLowerCase()),
      );
    }
    if (debouncedSearch.trim() === "") return myClasses.data;
    else {
      return myClasses.data.filter((value) =>
        value.courseTitle.toLowerCase().includes(debouncedSearch.toLowerCase()),
      );
    }
  }, [debouncedSearch, myClasses, filter]);

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
    return displayData?.slice(start, start + rowPageCount);
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
    if (myClasses?.data?.success == false) {
      navigate("/UserPanel/Dashboard");
      toast.error(myClasses?.data?.message);
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
        <div className={`block`}>
          <SelectModal
            items={filtersItems}
            contentPosition={"popper"}
            contentClassName={`min-w-fit! ${theme ? `bg-[#1e1e1e] text-white` : `bg-white text-[#1E1E1E]`}`}
            itemClassName={`${theme ? `focus:bg-[oklch(0.269_0_0)]` : `focus:bg-muted`} h-8! cursor-pointer!`}
            value={filter ?? undefined}
            triggerClassName={`xl:px-4! px-3! text-default-black! font-normal text-base! xl:h-12! h-10! rounded-[16px]! cursor-pointer bg-default-light! ring-0! border border-light-gray`}
            setValue={setFilter}
            onValueChange={setFilter}
            placeHolder={t("userPanel.myCoursesSection.filters")}
          />
        </div>
      </div>
      <div
        data-tour="step1"
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
                className={`rounded-[20px] bg-default-light flex flex-col gap-3 relative ${view ? `p-4` : `2xl:w-6/10 w-7/10`}`}
              >
                <h3
                  className={`text-base font-bold truncate text-default-black`}
                >
                  {formatDate(value.startDate)}
                </h3>
                <div className={`flex items-center justify-between`}>
                  <div className={`flex items-center gap-4`}>
                    <div className="flex items-center gap-2">
                      <span className="text-default-black text-[12px]">
                        {t("userPanel.myClass.startTime")}
                      </span>
                      <span
                        className={`text-field-silver text-[12px] font-normal`}
                      >
                        {value.startTime}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-default-black text-[12px]">
                        {t("userPanel.myClass.endTime")}
                      </span>
                      <span
                        className={`text-field-silver text-[12px] font-normal`}
                      >
                        {value.endTime}
                      </span>
                    </div>
                  </div>
                  <Badge
                    color={!value.AP ? "panelDecline" : "panelAccept"}
                    className={`px-3 py-0.5 xl:text-base! text-[14px]`}
                  >
                    {!value.AP
                      ? t("userPanel.myClass.close")
                      : t("userPanel.myClass.open")}
                  </Badge>
                </div>
                <div className={`flex items-center gap-3`}>
                  <Tooltip>
                    <TooltipTrigger>
                      <EyeIcon
                        className="xl:size-5 size-4 cursor-pointer"
                        color="#008C78"
                        onClick={() => handleDetailModal(value)}
                      />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p> {t("userPanel.tooltip.eye")}</p>
                    </TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger>
                      <div className={``} data-tour="step1">
                        <UserCheck
                          className="xl:size-5 size-4 cursor-pointer"
                          color="#008C78"
                          onClick={() =>
                            absentStatusMutate({
                              sessionId: value.id,
                              present: true,
                              studentHand: false,
                              absentReason: null,
                            })
                          }
                        />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p> {t("userPanel.tooltip.present")}</p>
                    </TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger>
                      <div className={``} data-tour="step1">
                        <UserX
                          className="xl:size-5 size-4 cursor-pointer"
                          color="#008C78"
                          onClick={() => handleAbsentModal(value)}
                        />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{t("userPanel.tooltip.absent")}</p>
                    </TooltipContent>
                  </Tooltip>
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
                {t("userPanel.myClass.startDate")}
              </th>
              <th
                className={`text-default-black text-center font-semibold xl:text-base text-[14px] border-b border-light-gray`}
              >
                {t("userPanel.myClass.startTime")}
              </th>
              <th
                className={`text-default-black text-center font-semibold xl:text-base text-[14px] border-b border-light-gray`}
              >
                {t("userPanel.myClass.endTime")}
              </th>
              <th
                className={`text-default-black text-center font-semibold xl:text-base text-[14px] border-b border-light-gray`}
              >
                {t("userPanel.myClass.absentStatus")}
              </th>
              <th
                className={`text-default-black font-semibold xl:text-base text-[14px] ${lang === "en" ? "pr-6 text-right" : "pl-6 text-left"} border-b border-light-gray`}
              >
                {t("userPanel.myCoursesSection.actions")}
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
                    <span className="truncate xl:max-w-80 max-w-35 xl:text-base text-[14px] font-normal">
                      {formatDate(value.startDate)}
                    </span>
                  </div>
                </td>
                <td className="border-b border-light-gray py-3 text-center xl:text-base text-[14px] font-normal text-default-black whitespace-nowrap">
                  {value.startTime}
                </td>
                <td className="border-b border-light-gray py-3 text-center xl:text-base text-[14px] font-normal text-default-black whitespace-nowrap">
                  {value.endTime}
                </td>
                <td className="border-b text-center border-light-gray py-3">
                  <Badge
                    color={!value.AP ? "panelDecline" : "panelAccept"}
                    className={`px-3 py-0.5 xl:text-base! text-[14px]`}
                  >
                    {!value.AP
                      ? t("userPanel.myClass.close")
                      : t("userPanel.myClass.open")}
                  </Badge>
                </td>
                <td
                  className={`border-b border-light-gray py-3 ${lang === "en" ? "xl:pr-6 pr-3" : "xl:pl-6 pl-3"}`}
                >
                  <div className="flex items-center justify-end gap-2">
                    <Tooltip>
                      <TooltipTrigger>
                        <EyeIcon
                          className="xl:size-5 size-4 cursor-pointer"
                          color="#008C78"
                          onClick={() => handleDetailModal(value)}
                        />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p> {t("userPanel.tooltip.eye")}</p>
                      </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                      <TooltipTrigger>
                        <div className={``} data-tour="step1">
                          <UserCheck
                            className="xl:size-5 size-4 cursor-pointer"
                            color="#008C78"
                            onClick={() =>
                              absentStatusMutate({
                                sessionId: value.id,
                                present: true,
                                studentHand: false,
                                absentReason: null,
                              })
                            }
                          />
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p> {t("userPanel.tooltip.present")}</p>
                      </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                      <TooltipTrigger>
                        <div className={``} data-tour="step1">
                          <UserX
                            className="xl:size-5 size-4 cursor-pointer"
                            color="#008C78"
                            onClick={() => handleAbsentModal(value)}
                          />
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{t("userPanel.tooltip.absent")}</p>
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
              titleButtons={true}
              length={pageArray.length}
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
              placeHolder={t("userPanel.myCoursesSection.rowsNumber")}
            />
          </div>
        </div>
      </div>
      <MyClassDetail
        isOpen={detailModal}
        setIsOpen={setDetailModal}
        props={courseReceiptProps}
      />
      <AbsentModal
        isOpen={absentModal}
        setIsOpen={setAbsentModal}
        props={courseReceiptProps}
      />
    </div>
  );
};

const MyClasses = () => {
  const { theme } = useContext(ThemeContext);
  const { lang } = useI18n();
  return (
    <TourProvider key={lang} steps={[]} styles={getTourStyles(theme, lang)}>
      <MyClassesContent />
    </TourProvider>
  );
};

export default MyClasses;
