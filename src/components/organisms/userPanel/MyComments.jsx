import ThemeContext from "@/app/context/ThemeContext";
import Button from "@/components/atoms/Buttons/Button";
import SelectModal from "@/components/molecules/Select/Select";
import LoadingSvg from "@/core/icons/LoadingSvg";
import {
  deleteCourseComment,
  useGetMyArticlesComments,
  useGetMyCourseComments,
} from "@/core/services/api/userPanel/userPanel.service";
import { useI18n } from "@/i18n/useI18n";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import debounce from "debounce";
import { EyeIcon, ListFilterPlus, Search, Trash, X } from "lucide-react";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import Badge from "@/components/atoms/Badge/Badge";
import formatDate from "@/core/utils/formatDate";
import PaginationComponents from "@/components/molecules/Pagination/Pagination";
import { PaginationEllipsis, PaginationItem } from "@/components/ui/pagination";
import { rowsOfPages } from "@/core/constants/courseSortings";
import { toast } from "react-toastify";
import { DrawerClose } from "@/components/ui/drawer";
import DrawerComponents from "@/components/molecules/Drawer/Drawer";
import CommentModal from "./MyComments/CommentModal";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const filtersItems = [
  {
    name: "confirmed",
    title: "تایید شده",
    titleEn: "Confirmed",
  },
  {
    name: "notConfirmed",
    title: "تایید نشده",
    titleEn: "Not Confirmed",
  },
  {
    name: "all",
    title: "همه",
    titleEn: "All",
  },
];
const filtersCategoryItems = [
  {
    name: "courses",
    title: "دوره ها",
    titleEn: "Courses",
  },
  {
    name: "articles",
    title: "اخبار",
    titleEn: "Articles",
  },
  {
    name: "all",
    title: "همه",
    titleEn: "All",
  },
];

const MyComments = () => {
  const { t, lang } = useI18n();
  const { theme } = useContext(ThemeContext);
  const queryClient = useQueryClient();

  const [filter, setFilter] = useState(null);
  const [filterCategory, setFilterCategory] = useState(null);
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [rowPageCount, setRowPageCount] = useState(8);
  const [deleteFiltersShow, setDeleteFiltersShow] = useState(false);
  const [whichPage, setWhichPage] = useState(1);
  const [commentModal, setCommentModal] = useState(false);
  const [commentProps, setCommentProps] = useState({
    title: "",
    describe: "",
    insertDate: "",
    accept: "",
    isNews: "",
    id: "",
  });

  const { isLoading, data: courseComments } = useGetMyCourseComments();
  const { isLoading: articlesLoading, data: articlesComments } =
    useGetMyArticlesComments();

  const handleDeleteFiltersShow = useCallback(() => {
    if (
      (filter === null || filter === "all") &&
      (filterCategory === null || filterCategory === "all") &&
      inputValue === ""
    ) {
      setDeleteFiltersShow(false);
    } else {
      setDeleteFiltersShow(true);
    }
  }, [filter, inputValue, filterCategory]);
  const handleDeleteFilters = () => {
    setInputValue("");
    setDebouncedSearch("");
    setFilter("all");
    setFilterCategory("all");
  };
  const handlePaymentProps = (values) => {
    setCommentModal(true);
    setCommentProps({
      title: values.title,
      describe: values.describe,
      insertDate: values.insertDate || values.inserDate,
      accept: values.accept,
      isNews: values.isNews,
      id: values.newsId || values.courseId,
    });
  };

  const { mutate: deleteCourseCommentMutate } = useMutation({
    mutationFn: (value) =>
      toast.promise(deleteCourseComment(value), {
        pending: "در حال حذف دیدگاه",
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
    onSuccess: (result) => {
      if (result.data.success) {
        if (result.status != 400) {
          queryClient.invalidateQueries({
            queryKey: [`MyCourseCommentsList`],
          });
        } else {
          toast.error(result.data.message);
        }
      } else {
        toast.error(result.data.message);
      }
    },
    onError: (result) => {
      toast.error(result.message);
    },
  });

  const courseCommentsData = useMemo(() => {
    if (!Array.isArray(courseComments?.data?.myCommentsDtos)) return [];
    if (debouncedSearch.trim() === "" && filter === "confirmed")
      return courseComments?.data?.myCommentsDtos.filter(
        (value) => value.accept,
      );
    else if (debouncedSearch.trim() !== "" && filter === "confirmed") {
      const filterData = courseComments?.data?.myCommentsDtos.filter(
        (value) => value.accept,
      );
      return filterData.filter((value) =>
        value.title.toLowerCase().includes(debouncedSearch.toLowerCase()),
      );
    }
    if (debouncedSearch.trim() === "" && filter === "notConfirmed")
      return courseComments?.data?.myCommentsDtos.filter(
        (value) => !value.accept,
      );
    else if (debouncedSearch.trim() !== "" && filter === "notConfirmed") {
      const filterData = courseComments?.data?.myCommentsDtos.filter(
        (value) => !value.accept,
      );
      return filterData.filter((value) =>
        value.title.toLowerCase().includes(debouncedSearch.toLowerCase()),
      );
    }
    if (debouncedSearch.trim() === "")
      return courseComments?.data?.myCommentsDtos;
    else {
      return courseComments?.data?.myCommentsDtos.filter((value) =>
        value.title.toLowerCase().includes(debouncedSearch.toLowerCase()),
      );
    }
  }, [debouncedSearch, courseComments, filter]);
  const articlesCommentsData = useMemo(() => {
    if (!Array.isArray(articlesComments?.data?.myNewsCommetDtos)) return [];
    const articles = articlesComments?.data?.myNewsCommetDtos.map((value) => {
      return { ...value, isNews: true };
    });
    if (debouncedSearch.trim() === "" && filter === "confirmed")
      return articles.filter((value) => value.accept);
    else if (debouncedSearch.trim() !== "" && filter === "confirmed") {
      const filterData = articles.filter((value) => value.accept);
      return filterData.filter((value) =>
        value.title.toLowerCase().includes(debouncedSearch.toLowerCase()),
      );
    }
    if (debouncedSearch.trim() === "" && filter === "notConfirmed")
      return articles.filter((value) => !value.accept);
    else if (debouncedSearch.trim() !== "" && filter === "notConfirmed") {
      const filterData = articles.filter((value) => !value.accept);
      return filterData.filter((value) =>
        value.title.toLowerCase().includes(debouncedSearch.toLowerCase()),
      );
    }
    if (debouncedSearch.trim() === "") return articles;
    else {
      return articles.filter((value) =>
        value.title.toLowerCase().includes(debouncedSearch.toLowerCase()),
      );
    }
  }, [debouncedSearch, articlesComments, filter]);

  const displayData = useMemo(() => {
    if (filterCategory === "courses") {
      return [...courseCommentsData];
    }
    if (filterCategory === "articles") {
      return [...articlesCommentsData];
    } else {
      return [...courseCommentsData, ...articlesCommentsData];
    }
  }, [articlesCommentsData, courseCommentsData, filterCategory]);

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
    handleDeleteFiltersShow();
  }, [handleDeleteFiltersShow]);
  useEffect(() => {
    if (pageCount < whichPage) {
      setWhichPage(1);
      window.scroll(0, 0);
    }
  }, [pageCount, whichPage]);
  return isLoading && articlesLoading ? (
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
          <DrawerComponents
            direction="bottom"
            theme={theme}
            trigger={
              <div
                className={`p-3 bg-green-primary rounded-full w-fit cursor-pointer sm:hidden block`}
              >
                <ListFilterPlus
                  className={`size-5 sm:size-6`}
                  color="#ffffff"
                />
              </div>
            }
            contentClassName={`${theme ? `bg-[#1e1e1e] border-[#0f0f0f]` : `bg-white border-[#f5f5f5]`} w-full`}
            primitiveClassName={`${theme ? `bg-[#0f0f0f]` : `bg-[#f5f5f5]`}`}
          >
            <div
              className={`flex flex-col gap-5 no-scrollbar overflow-y-auto p-4 lg:hidden`}
            >
              <div className={`flex items-center justify-between`}>
                <span
                  className={`text-default-black text-[20px] flex gap-2 items-center`}
                >
                  <p> {t("courses.filters.filtersName")}</p>
                  {deleteFiltersShow && (
                    <Button
                      onClick={handleDeleteFilters}
                      color={"authBtn"}
                      className={`p-1 flex items-center justify-center gap-1`}
                    >
                      <X className={`size-5`} />
                    </Button>
                  )}
                </span>
                <DrawerClose asChild>
                  <div
                    className={`px-2 py-1 font-bold text-red-error text-[14px] rounded-[64px] border border-red-error w-fit cursor-pointer`}
                  >
                    {t("courses.filters.closeBtn")}
                  </div>
                </DrawerClose>
              </div>
              <div className={`flex flex-col gap-5 lg:hidden justify-between`}>
                <div className={`flex justify-between items-center`}>
                  <span
                    className={`text-default-black font-normal md:text-base text-[14px]`}
                  >
                    {t("userPanel.reservedSection.filtersCategory")}
                  </span>
                  <SelectModal
                    items={filtersCategoryItems}
                    contentPosition={"popper"}
                    contentClassName={`min-w-fit! relative! z-100! ${theme ? `bg-[#1e1e1e] text-white` : `bg-white text-[#1E1E1E]`}`}
                    itemClassName={`${theme ? `focus:bg-[oklch(0.269_0_0)]` : `focus:bg-muted`} h-8! cursor-pointer!`}
                    value={filterCategory ?? undefined}
                    triggerClassName={`xl:px-4! px-3! text-default-black! font-normal text-base! xl:h-12! h-10! rounded-[16px]! cursor-pointer bg-default-light! ring-0! border border-light-gray`}
                    setValue={setFilterCategory}
                    onValueChange={setFilterCategory}
                    placeHolder={t("userPanel.reservedSection.filtersCategory")}
                  />
                </div>
                <div className={`flex justify-between items-center`}>
                  <span
                    className={`text-default-black font-normal md:text-base text-[14px]`}
                  >
                    {t("userPanel.reservedSection.filters")}
                  </span>
                  <SelectModal
                    items={filtersItems}
                    contentPosition={"popper"}
                    contentClassName={`min-w-fit! relative! z-100! ${theme ? `bg-[#1e1e1e] text-white` : `bg-white text-[#1E1E1E]`}`}
                    itemClassName={`${theme ? `focus:bg-[oklch(0.269_0_0)]` : `focus:bg-muted`} h-8! cursor-pointer!`}
                    value={filter ?? undefined}
                    triggerClassName={`xl:px-4! px-3! text-default-black! font-normal text-base! xl:h-12! h-10! rounded-[16px]! cursor-pointer bg-default-light! ring-0! border border-light-gray`}
                    setValue={setFilter}
                    onValueChange={setFilter}
                    placeHolder={t("userPanel.reservedSection.filters")}
                  />
                </div>
                <div className={`flex justify-between items-center`}>
                  <span
                    className={`text-default-black font-normal md:text-base text-[14px]`}
                  >
                    {t("courses.sorting.rowsOf")}
                  </span>
                  <SelectModal
                    items={rowsOfPages}
                    contentPosition={"popper"}
                    contentClassName={`min-w-fit! relative! z-100! ${theme ? `bg-[#1e1e1e] text-white` : `bg-white text-[#1E1E1E]`}`}
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
          </DrawerComponents>
          {deleteFiltersShow && (
            <Button
              onClick={handleDeleteFilters}
              color={"authBtn"}
              className={`p-2 sm:flex hidden items-center justify-center gap-1`}
            >
              <p className={`hidden xl:block`}>
                {t("courses.filters.deleteFilter")}
              </p>
              <X className={`block`} />
            </Button>
          )}
        </div>
        <div className={`sm:flex hidden gap-4`}>
          <SelectModal
            items={filtersCategoryItems}
            contentPosition={"popper"}
            contentClassName={`min-w-fit! ${theme ? `bg-[#1e1e1e] text-white` : `bg-white text-[#1E1E1E]`}`}
            itemClassName={`${theme ? `focus:bg-[oklch(0.269_0_0)]` : `focus:bg-muted`} h-8! cursor-pointer!`}
            value={filterCategory ?? undefined}
            triggerClassName={`xl:px-4! px-3! text-default-black! font-normal text-base! xl:h-12! h-10! rounded-[16px]! cursor-pointer bg-default-light! ring-0! border border-light-gray`}
            setValue={setFilterCategory}
            onValueChange={setFilterCategory}
            placeHolder={t("userPanel.reservedSection.filtersCategory")}
          />
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
        <div className={`flex flex-col gap-3 sm:hidden`}>
          {currentPageData?.map((value, index) => (
            <div
              key={index}
              className={`flex flex-col gap-8 bg-default-light p-3 rounded-2xl`}
            >
              <div className={`flex flex-col gap-6`}>
                <div className={`flex flex-col gap-3`}>
                  <p
                    className={`text-field-silver md:text-[14px] text-[12px] font-normal`}
                  >
                    {formatDate(value.insertDate || value.inserDate)}
                  </p>
                  <div>
                    <span
                      className={`md:text-[14px] text-[12px] text-default-black font-normal`}
                    >
                      {value.title}
                    </span>
                    <p
                      className={`md:text-[14px] text-[12px] text-field-silver leading-loose font-normal`}
                    >
                      {value.describe}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 w-fit">
                    <Badge
                      color={
                        value.isNews
                          ? "panelAccept"
                          : value.accept
                            ? "panelAccept"
                            : "panelDecline"
                      }
                      className={`px-3 py-0.5 xl:text-base! text-[14px]`}
                    >
                      {value.isNews
                        ? t("userPanel.myPaymentsSection.confirmed")
                        : value.accept
                          ? t("userPanel.myPaymentsSection.confirmed")
                          : t("userPanel.myPaymentsSection.notConfirmed")}
                    </Badge>
                    <EyeIcon
                      onClick={() => handlePaymentProps(value)}
                      className="xl:size-5 size-4 cursor-pointer"
                      color="#008C78"
                    />
                    {!value.isNews ? (
                      <Trash
                        className="xl:size-5 size-4 cursor-pointer mx-auto"
                        color="#008C78"
                        onClick={() => deleteCourseCommentMutate(value.id)}
                      />
                    ) : (
                      <div className="xl:size-5 size-4 invisible opacity-0 mx-auto" />
                    )}
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
                {t("userPanel.myCommentsSection.commentTitle")}
              </th>
              <th
                className={`text-default-black ${lang === "en" ? "text-left" : "text-right"} font-semibold xl:text-base text-[14px] border-b border-light-gray`}
              >
                {t("userPanel.myCommentsSection.commentText")}
              </th>
              <th
                className={`text-default-black text-center font-semibold xl:text-base text-[14px] border-b border-light-gray`}
              >
                {t("userPanel.myCommentsSection.status")}
              </th>
              <th
                className={`text-default-black text-center font-semibold xl:text-base text-[14px] border-b border-light-gray`}
              >
                {t("userPanel.myCommentsSection.date")}
              </th>
              <th
                className={`text-default-black font-semibold xl:text-base text-[14px] ${lang === "en" ? "pr-6 text-right" : "pl-6 text-left"} border-b border-light-gray`}
              >
                {t("userPanel.myCommentsSection.operation")}
              </th>
            </tr>
          </thead>
          <tbody>
            {currentPageData?.map((value, index) => (
              <tr key={index}>
                <td
                  className={`border-b border-light-gray py-3 text-default-black truncate xl:max-w-55 max-w-35 xl:w-55 w-35 xl:text-base text-[14px] font-normal ${lang === "en" ? "xl:pl-6 pl-3" : "xl:pr-6 pr-3"}`}
                >
                  {value.title}
                </td>
                <td className="border-b border-light-gray py-3 text-right truncate xl:max-w-75 lg:max-w-55 max-w-35 xl:w-75 lg:w-55 w-35 xl:text-base text-[14px] font-normal text-default-black whitespace-nowrap">
                  {value.describe}
                </td>
                <td className="border-b text-center border-light-gray py-3">
                  <Badge
                    color={
                      value.isNews
                        ? "panelAccept"
                        : value.accept
                          ? "panelAccept"
                          : "panelDecline"
                    }
                    className={`px-3 py-0.5 xl:text-base! text-[14px]`}
                  >
                    {value.isNews
                      ? t("userPanel.myPaymentsSection.confirmed")
                      : value.accept
                        ? t("userPanel.myPaymentsSection.confirmed")
                        : t("userPanel.myPaymentsSection.notConfirmed")}
                  </Badge>
                </td>
                <td className="border-b border-light-gray py-3 text-center xl:text-base text-[14px] font-normal text-default-black whitespace-nowrap">
                  {formatDate(value.insertDate || value.inserDate)}
                </td>
                <td
                  className={`border-b w-10 border-light-gray py-3 ${lang === "en" ? "xl:pr-6 pr-3" : "xl:pl-6 pl-3"}`}
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
                        <p>{t("userPanel.tooltip.eye")}</p>
                      </TooltipContent>
                    </Tooltip>

                    {!value.isNews ? (
                      <Tooltip>
                        <TooltipTrigger>
                          <Trash
                            className="xl:size-5 size-4 cursor-pointer mx-auto"
                            color="#008C78"
                            onClick={() => deleteCourseCommentMutate(value.id)}
                          />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{t("userPanel.tooltip.deleteComment")}</p>
                        </TooltipContent>
                      </Tooltip>
                    ) : (
                      <div className="xl:size-5 size-4 invisible opacity-0 mx-auto" />
                    )}
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
      <CommentModal
        isOpen={commentModal}
        setIsOpen={setCommentModal}
        props={commentProps}
      />
    </div>
  );
};

export default MyComments;
