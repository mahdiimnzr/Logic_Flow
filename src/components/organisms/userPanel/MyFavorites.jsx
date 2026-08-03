import ThemeContext from "@/app/context/ThemeContext";
import Button from "@/components/atoms/Buttons/Button";
import ImageFallback from "@/components/atoms/ImageFallBack/ImageFallBack";
import DrawerComponents from "@/components/molecules/Drawer/Drawer";
import PaginationComponents from "@/components/molecules/Pagination/Pagination";
import SelectModal from "@/components/molecules/Select/Select";
import { DrawerClose } from "@/components/ui/drawer";
import { PaginationEllipsis, PaginationItem } from "@/components/ui/pagination";
import { rowsOfPages } from "@/core/constants/courseSortings";
import LoadingSvg from "@/core/icons/LoadingSvg";
import {
  useGetMyFavoriteArticles,
  useGetMyFavoriteCourses,
} from "@/core/services/api/userPanel/userPanel.service";
import formatDate from "@/core/utils/formatDate";
import { useI18n } from "@/i18n/useI18n";
import debounce from "debounce";
import { EyeIcon, ListFilterPlus, Search, Trash, X } from "lucide-react";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import courseImage from "../../../assets/images/coursePng.png";
import useFavoriteCourse from "@/core/services/api/hooks/useFavoriteCourses";
import useAddFavoriteArticle from "@/core/services/api/hooks/useAddFavoriteArticle";
import CalenderIcon from "@/core/icons/CalenderIcon";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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

const MyFavorites = () => {
  const { t, lang } = useI18n();
  const { theme } = useContext(ThemeContext);

  const view = true;
  const [filterCategory, setFilterCategory] = useState(null);
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [rowPageCount, setRowPageCount] = useState(8);
  const [deleteFiltersShow, setDeleteFiltersShow] = useState(false);
  const [whichPage, setWhichPage] = useState(1);

  const { isLoading, data: courseFavorites } = useGetMyFavoriteCourses();
  const { removeFavoriteCourseMutate } = useFavoriteCourse();
  const { removeFavoriteNewsMutate } = useAddFavoriteArticle();
  const { isLoading: articlesLoading, data: articlesFavorites } =
    useGetMyFavoriteArticles();

  const handleDeleteFiltersShow = useCallback(() => {
    if (
      (filterCategory === null || filterCategory === "all") &&
      inputValue === ""
    ) {
      setDeleteFiltersShow(false);
    } else {
      setDeleteFiltersShow(true);
    }
  }, [inputValue, filterCategory]);
  const handleDeleteFilters = () => {
    setInputValue("");
    setDebouncedSearch("");
    setFilterCategory("all");
  };

  const courseFavoritesData = useMemo(() => {
    if (!Array.isArray(courseFavorites?.data?.favoriteCourseDto)) return [];
    if (debouncedSearch.trim() === "")
      return courseFavorites?.data?.favoriteCourseDto;
    else {
      return courseFavorites?.data?.favoriteCourseDto.filter((value) =>
        value.courseTitle.toLowerCase().includes(debouncedSearch.toLowerCase()),
      );
    }
  }, [debouncedSearch, courseFavorites]);
  const articlesFavoriteData = useMemo(() => {
    if (!Array.isArray(articlesFavorites?.data?.myFavoriteNews)) return [];
    const articles = articlesFavorites?.data?.myFavoriteNews.map((value) => {
      return { ...value, isNews: true };
    });
    if (debouncedSearch.trim() === "") return articles;
    else {
      return articles.filter((value) =>
        value.title.toLowerCase().includes(debouncedSearch.toLowerCase()),
      );
    }
  }, [debouncedSearch, articlesFavorites]);

  const displayData = useMemo(() => {
    if (filterCategory === "courses") {
      return [...courseFavoritesData];
    }
    if (filterCategory === "articles") {
      return [...articlesFavoriteData];
    } else {
      return [...courseFavoritesData, ...articlesFavoriteData];
    }
  }, [articlesFavoriteData, courseFavoritesData, filterCategory]);

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
        </div>
      </div>
      <div
        className={`sm:bg-default-light sm:border border-light-gray rounded-[24px] h-full flex flex-col justify-between gap-4 pb-8`}
      >
        <div className={`flex flex-col gap-3 sm:hidden`}>
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
                  onClick={() => {
                    const formData = new FormData();
                    formData.append("CourseFavoriteId", value.favoriteId);
                    value.isNews
                      ? removeFavoriteNewsMutate({
                          deleteEntityId: value.favoriteId,
                          key: `MyFavoriteNews`,
                        })
                      : removeFavoriteCourseMutate({
                          formData,
                          key: "MyFavoriteCourses",
                        });
                  }}
                />
              </div>
              <Link
                to={
                  value.isNews
                    ? `/Articles/Detail/${value.newsId}/Review`
                    : `/Courses/Detail/${value.courseId}/Review`
                }
                className={`rounded-[12px] group content-center block relative ${view ? `lg:h-60 sm:h-50 h-45` : `2xl:w-4/10 lg:w-3/10 w-4/10 2xl:h-40 lg:h-50 h-35 overflow-hidden`}`}
              >
                <ImageFallback
                  src={
                    value.isNews
                      ? value.currentImageAddressTumb
                      : value.imageAddress
                  }
                  fallback={courseImage}
                  className={`${!view ? `group-hover:transform-[scale(1)]` : `group-hover:transform-[scale(1.2)]`} transform-[scale(1.5)] size-full transition-all cursor-pointer mx-auto absolute inset-0 object-cover`}
                />
              </Link>
              <div
                className={`rounded-[20px] bg-default-light flex flex-col gap-7 relative ${view ? `p-4` : `2xl:w-6/10 w-7/10`}`}
              >
                <div className={`flex flex-col gap-2 text-default-black`}>
                  <h3 className={`text-base font-bold truncate`}>
                    {value.isNews ? value.title : value.courseTitle}
                  </h3>
                  <p className={`text-[14px] font-normal h-10.5 line-clamp-2`}>
                    {value.isNews
                      ? value.news.miniDescribe
                      : value.course.miniDescribe}
                  </p>
                </div>
                <div className={`flex flex-col gap-2`}>
                  <div className={`flex items-center justify-between`}>
                    <div className={`flex items-center gap-1`}>
                      <CalenderIcon />
                      <span
                        className={`text-field-silver text-[12px] font-normal`}
                      >
                        {formatDate(
                          value.isNews
                            ? value.news.updateDate
                            : value.course.lastUpdate,
                        )}
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
                {t("userPanel.myFavoritesSection.title")}
              </th>
              <th
                className={`text-default-black font-semibold xl:text-base text-[14px] border-b border-light-gray ${lang === "en" ? "text-left" : "text-right"}`}
              >
                {t("userPanel.myFavoritesSection.describe")}
              </th>
              <th
                className={`text-default-black text-center font-semibold xl:text-base text-[14px] border-b border-light-gray`}
              >
                {t("userPanel.myFavoritesSection.lastUpdate")}
              </th>
              <th
                className={`text-default-black font-semibold xl:text-base text-[14px] ${lang === "en" ? "pr-6 text-right" : "pl-6 text-left"} border-b border-light-gray`}
              >
                {t("userPanel.myFavoritesSection.operation")}
              </th>
            </tr>
          </thead>
          <tbody>
            {currentPageData?.map((value, index) => (
              <tr key={index}>
                <td
                  className={`xl:max-w-80 max-w-35 border-b border-light-gray py-3`}
                >
                  <div
                    className={`xl:max-w-80 max-w-35 flex items-center justify-start xl:gap-4 gap-2 ${lang === "en" ? "xl:pl-6 pl-3" : "xl:pr-6 pr-3"}`}
                  >
                    <ImageFallback
                      className="size-8 rounded-full shrink-0"
                      src={
                        value.isNews
                          ? value.currentImageAddressTumb
                          : value.imageAddress
                      }
                      fallback={courseImage}
                    />
                    <span className="truncate xl:max-w-80 max-w-35 xl:text-base text-[14px] font-normal text-default-black">
                      {value.isNews ? value.title : value.courseTitle}
                    </span>
                  </div>
                </td>
                <td className="border-b border-light-gray py-3 truncate xl:max-w-90 max-w-45 xl:text-base text-[14px] font-normal text-default-black whitespace-nowrap">
                  {value.isNews
                    ? value.news.miniDescribe
                    : value.course.miniDescribe}
                </td>
                <td className="border-b border-light-gray py-3 text-center xl:text-base text-[14px] font-normal text-default-black whitespace-nowrap">
                  {formatDate(
                    value.isNews
                      ? value.news.updateDate
                      : value.course.lastUpdate,
                  )}
                </td>
                <td
                  className={`border-b w-10 border-light-gray py-3 ${lang === "en" ? "xl:pr-6 pr-3" : "xl:pl-6 pl-3"}`}
                >
                  <div className="flex items-center justify-end gap-2">
                    <Tooltip>
                      <TooltipTrigger>
                        <Link
                          to={
                            value.isNews
                              ? `/Articles/Detail/${value.newsId}/Review`
                              : `/Courses/Detail/${value.courseId}/Review`
                          }
                        >
                          <EyeIcon
                            className="xl:size-5 size-4"
                            color="#008C78"
                          />
                        </Link>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{t("userPanel.tooltip.eye")}</p>
                      </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                      <TooltipTrigger>
                        <Trash
                          className="xl:size-5 size-4 cursor-pointer mx-auto"
                          color="#008C78"
                          onClick={() => {
                            const formData = new FormData();
                            formData.append(
                              "CourseFavoriteId",
                              value.favoriteId,
                            );
                            value.isNews
                              ? removeFavoriteNewsMutate({
                                  deleteEntityId: value.favoriteId,
                                  key: `MyFavoriteNews`,
                                })
                              : removeFavoriteCourseMutate({
                                  formData,
                                  key: "MyFavoriteCourses",
                                });
                          }}
                        />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{t("userPanel.tooltip.removeFavorites")}</p>
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

export default MyFavorites;
