import ThemeContext from "@/app/context/ThemeContext";
import SelectModal from "@/components/molecules/Select/Select";
import LoadingSvg from "@/core/icons/LoadingSvg";
import {
  addHomeWorkFirst,
  useGetUserHomeWorks,
} from "@/core/services/api/userPanel/userPanel.service";
import { useI18n } from "@/i18n/useI18n";
import { BookCheck, EyeIcon, Search, X } from "lucide-react";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import formatDate from "@/core/utils/formatDate";
import { useNavigate } from "react-router-dom";
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
import HomeWorkDetail from "./MyHomeWorks/HomeWorkDetail";
import { useMutation } from "@tanstack/react-query";
import HomeWorkFile from "./MyHomeWorks/HomeWorkFile";

const MyHomeWorkContent = () => {
  const { openRef } = useTourControl();
  const { setIsOpen, setSteps } = useTour();
  const { t, lang } = useI18n();
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const [detailModal, setDetailModal] = useState(false);
  const [homeWorkModal, setHomeWorkModal] = useState(false);
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [rowPageCount, setRowPageCount] = useState(8);
  const [whichPage, setWhichPage] = useState(1);
  const [deleteFiltersShow, setDeleteFiltersShow] = useState(false);
  const [coursePaymentProps, setCoursePaymentProps] = useState({
    homeWorkId: "",
    courseStudentId: "",
    hwTitle: "",
    hwDescribe: "",
    groupName: "",
    homeWorkDate: "",
  });

  const { isLoading, data: myHomeWorks } = useGetUserHomeWorks();

  const handleDeleteFiltersShow = useCallback(() => {
    if (inputValue === "") {
      setDeleteFiltersShow(false);
    } else {
      setDeleteFiltersShow(true);
    }
  }, [inputValue]);
  const handleDeleteFilters = () => {
    setInputValue("");
    setDebouncedSearch("");
  };

  const handlePaymentProps = (values) => {
    setDetailModal(true);
    setCoursePaymentProps({
      homeWorkId: values.homeWorkId,
      courseStudentId: values.courseStudentId,
      hwTitle: values.hwTitle,
      hwDescribe: values.hwDescribe,
      groupName: values.groupName,
      homeWorkDate: values.homeWorkDate,
    });
  };

  const { mutate: sendHomeWorkMutate } = useMutation({
    mutationFn: (params) =>
      toast.promise(addHomeWorkFirst(params), {
        pending: "در حال ثبت درخواست",
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
        setCoursePaymentProps({
          ...coursePaymentProps,
          courseUserHomeWorkId: response?.data?.id,
        });
        setHomeWorkModal(true);
      } else if (!response.data.success) {
        toast.error(response.data.message);
      }
    },
  });

  useEffect(() => {
    openRef.current = setIsOpen;
    setSteps([
      {
        selector: '[data-tour="step1"]',
        content: t("userPanel.homeWorks.step1"),
      },
    ]);
  }, [t]);

  const displayData = useMemo(() => {
    if (!Array.isArray(myHomeWorks?.data)) return [];
    if (debouncedSearch.trim() === "") return myHomeWorks.data;
    else {
      return myHomeWorks.data.filter((value) =>
        value.hwTitle.toLowerCase().includes(debouncedSearch.toLowerCase()),
      );
    }
  }, [debouncedSearch, myHomeWorks]);

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
    if (myHomeWorks?.data?.success == false) {
      navigate("/UserPanel/Dashboard");
      toast.error(myHomeWorks?.data?.message);
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
              placeholder={t("userPanel.myCoursesSection.searchPlaceHolder")}
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
      </div>
      <div
        data-tour="step1"
        className={`sm:bg-default-light sm:border border-light-gray rounded-[24px] h-full flex flex-col justify-between gap-4 pb-8`}
      >
        <div className={`flex flex-col gap-5 sm:hidden`}>
          {currentPageData?.map((value, index) => (
            <div
              key={index}
              dir="rtl"
              className="relative w-full rounded-[20px] bg-default-light p-5 shadow-[0px_4px_4px_0px_#000000]/0 transition-all hover:shadow-cards-hover"
            >
              <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-2">
                  <h3 className="text-base font-bold text-default-black line-clamp-1">
                    {value.hwTitle}
                  </h3>
                  <p className="text-sm text-field-silver line-clamp-2">
                    {value.hwDescribe}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <span className="text-xs text-field-silver">
                      {t("userPanel.homeWorks.group")}
                    </span>
                    <span className="text-sm font-medium text-default-black">
                      {value.groupName}
                    </span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-xs text-field-silver">
                      {t("userPanel.homeWorks.date")}
                    </span>
                    <span className="text-sm font-medium text-default-black">
                      {formatDate(value.homeWorkDate)}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Tooltip>
                    <TooltipTrigger>
                      <EyeIcon
                        onClick={() => handlePaymentProps(value)}
                        className="size-5 cursor-pointer"
                        color="#008C78"
                      />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p> {t("userPanel.tooltip.eye")}</p>
                    </TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger>
                      <BookCheck
                        onClick={() => {
                          setCoursePaymentProps({
                            homeWorkId: value.homeWorkId,
                            courseStudentId: value.courseStudentId,
                            hwTitle: value.hwTitle,
                            hwDescribe: value.hwDescribe,
                            groupName: value.groupName,
                            homeWorkDate: value.homeWorkDate,
                          });
                          sendHomeWorkMutate({
                            hwid: value.homeWorkId,
                            cstudentId: value.courseStudentId,
                          });
                        }}
                        className="size-5 cursor-pointer"
                        color="#008C78"
                      />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p> {t("userPanel.tooltip.request")}</p>
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
                {t("userPanel.homeWorks.title")}
              </th>
              <th
                className={`text-default-black ${lang === "en" ? "text-left" : "text-right"} font-semibold xl:text-base text-[14px] border-b border-light-gray`}
              >
                {t("userPanel.homeWorks.describe")}
              </th>
              <th
                className={`text-default-black text-center font-semibold xl:text-base text-[14px] border-b border-light-gray`}
              >
                {t("userPanel.homeWorks.group")}
              </th>
              <th
                className={`text-default-black text-center font-semibold xl:text-base text-[14px] border-b border-light-gray`}
              >
                {t("userPanel.homeWorks.date")}
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
                <td className="xl:w-50 w-35 border-b border-light-gray py-3 text-default-black">
                  <div
                    className={`xl:max-w-50 max-w-35 flex items-center justify-start xl:gap-4 gap-2 ${lang === "en" ? "xl:pl-6 pl-3" : "xl:pr-6 pr-3"}`}
                  >
                    <span className="truncate xl:max-w-80 max-w-35 xl:text-base text-[14px] font-normal">
                      {value.hwTitle}
                    </span>
                  </div>
                </td>
                <td className="truncate xl:max-w-50 max-w-45 border-b border-light-gray py-3 text-right xl:text-base text-[14px] font-normal text-default-black whitespace-nowrap">
                  {value.hwDescribe}
                </td>
                <td className="border-b border-light-gray py-3 text-center xl:text-base text-[14px] font-normal text-default-black whitespace-nowrap">
                  {value.groupName}
                </td>
                <td className="border-b border-light-gray py-3 text-center xl:text-base text-[14px] font-normal text-default-black whitespace-nowrap">
                  {formatDate(value.homeWorkDate)}
                </td>
                <td
                  className={`border-b border-light-gray py-3 ${lang === "en" ? "xl:pr-6 pr-3" : "xl:pl-6 pl-3"}`}
                >
                  <div className="flex items-center justify-end gap-2">
                    <Tooltip>
                      <TooltipTrigger>
                        <EyeIcon
                          onClick={() => handlePaymentProps(value)}
                          className="xl:size-5 size-4 cursor-pointer"
                          color="#008C78"
                        />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p> {t("userPanel.tooltip.eye")}</p>
                      </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                      <TooltipTrigger>
                        <BookCheck
                          onClick={() => {
                            setCoursePaymentProps({
                              homeWorkId: value.homeWorkId,
                              courseStudentId: value.courseStudentId,
                              hwTitle: value.hwTitle,
                              hwDescribe: value.hwDescribe,
                              groupName: value.groupName,
                              homeWorkDate: value.homeWorkDate,
                            });
                            sendHomeWorkMutate({
                              hwid: value.homeWorkId,
                              cstudentId: value.courseStudentId,
                            });
                          }}
                          className="xl:size-5 size-4 cursor-pointer"
                          color="#008C78"
                        />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p> {t("userPanel.tooltip.request")}</p>
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
      <HomeWorkDetail
        isOpen={detailModal}
        setIsOpen={setDetailModal}
        props={coursePaymentProps}
      />
      <HomeWorkFile
        isOpen={homeWorkModal}
        setIsOpen={setHomeWorkModal}
        props={coursePaymentProps}
      />
    </div>
  );
};
const MyHomeWorks = () => {
  const { theme } = useContext(ThemeContext);
  const { lang } = useI18n();
  return (
    <TourProvider key={lang} steps={[]} styles={getTourStyles(theme, lang)}>
      <MyHomeWorkContent />
    </TourProvider>
  );
};

export default MyHomeWorks;
