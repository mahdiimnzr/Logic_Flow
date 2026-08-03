import "rc-slider/assets/index.css";
import Card from "@/components/molecules/Cards/Card";
import PaginationComponents from "@/components/molecules/Pagination/Pagination";
import { PaginationEllipsis, PaginationItem } from "@/components/ui/pagination";
import { Skeleton } from "@/components/ui/skeleton";
import { useI18n } from "@/i18n/useI18n";
import { ChevronLeft } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";
import Filters from "./Filters";
import SortsSection from "./SortsSection";
import useGetArticles from "@/core/services/api/hooks/useGetArticles";
import {
  updateArticlesFilters,
  updateArticlesParams,
} from "@/app/store/actions";
import useAddFavoriteArticle from "@/core/services/api/hooks/useAddFavoriteArticle";

const ArticlesList = () => {
  const { t, lang } = useI18n();
  const dispatch = useDispatch();

  const [searchParams, setSearchParams] = useSearchParams();

  const { addFavoriteNewsMutate } = useAddFavoriteArticle();

  const skeletonCount = new Array(8).fill("");
  const [whichPage, setWhichPage] = useState(1);
  const [rowPageCount, setRowPageCount] = useState(12);
  const [gridView, setGridView] = useState(true);
  const params = useSelector((state) => state.articlesSlice.params);

  const { searchValue } = useSelector((state) => state.articlesSlice.filters);

  const setFilter = (key, value) =>
    dispatch(updateArticlesFilters({ key, value }));

  const {
    isLoading,
    data: articles,
    refetch,
  } = useGetArticles("ArticlesList", params);

  const pageCount = useMemo(
    () =>
      articles?.data?.totalCount
        ? Math.ceil(articles?.data?.totalCount / rowPageCount)
        : 1,
    [articles?.data?.totalCount, rowPageCount],
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

  const goToPage = (value) => {
    setWhichPage(value);
    window.scroll(0, 0);
  };

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
      updateArticlesParams({
        key: "Query",
        value: searchParams.get("Query"),
      }),
    );
  }, [isLoading]);
  useEffect(() => {
    if (pageCount < whichPage) {
      setWhichPage(1);
      dispatch(
        updateArticlesParams({
          key: "PageNumber",
          value: 1,
        }),
      );
      window.scroll(0, 0);
    }
  }, [pageCount, whichPage, dispatch]);
  return (
    <div className={`flex flex-col items-center lg:gap-32 md:gap-20 gap-10`}>
      <div className={`flex flex-col items-center gap-4`}>
        <div className={`flex items-center gap-1`}>
          <Link
            to={"/"}
            className={`text-[14px] font-normal text-green-primary`}
          >
            {t("articles.navigation.homePage")}
          </Link>
          <ChevronLeft
            className={`size-4 ${lang === "en" ? "transform-[rotate(180deg)]" : "transform-[rotate(0deg)]"}`}
            color="#008C78"
          />
          <Link className={`text-[14px] font-normal text-green-primary`}>
            {t("articles.navigation.articlesPage")}
          </Link>
        </div>
        <div className={`flex items-center gap-2`}>
          <p className={`text-default-black md:text-[32px] font-bold`}>
            {t("articles.navigation.title")}
          </p>
          <span className={`text-field-silver md:text-base font-normal`}>
            ({articles?.data?.totalCount} {t("articles.navigation.result")})
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
          ) : articles?.data?.news?.length === 0 ? (
            <span
              className={`font-bold text-4xl w-full text-center text-default-black`}
            >
              موردی یافت نشد
            </span>
          ) : (
            <div
              className={`grid ${gridView ? `2xl:grid-cols-4 xl:grid-cols-3 md:grid-cols-2 grid-cols-1` : `2xl:grid-cols-2 grid-cols-1`} gap-4`}
            >
              {articles?.data?.news?.map((article, index) => (
                <Card
                  view={gridView}
                  key={index}
                  articleId={article.id}
                  title={article.title}
                  describe={article.describe}
                  categoryName={article.newsCatregoryName}
                  insertDate={article.insertDate}
                  currentView={article.currentView}
                  rate={article.newsRate.avg}
                  image={article.currentImageAddress}
                  isCourseCard={false}
                  handleAddFavoriteCourse={addFavoriteNewsMutate}
                />
              ))}
            </div>
          )}
          <PaginationComponents
            length={pageArray.length}
            prevOnClick={() => {
              const firstPage = pageArray[0];
              whichPage !== firstPage &&
                (setWhichPage(whichPage - 1),
                dispatch(
                  updateArticlesParams({
                    key: "PageNumber",
                    value: whichPage - 1,
                  }),
                ),
                window.scroll(0, 0));
            }}
            nextOnClick={() => {
              const lastPage = pageArray[pageArray.length - 1];
              whichPage !== lastPage &&
                (setWhichPage(whichPage + 1),
                dispatch(
                  updateArticlesParams({
                    key: "PageNumber",
                    value: whichPage + 1,
                  }),
                ),
                window.scroll(0, 0));
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
                  onClick={() => {
                    whichPage !== item &&
                      (setWhichPage(item),
                      dispatch(
                        updateArticlesParams({
                          key: "PageNumber",
                          value: item,
                        }),
                      ),
                      window.scroll(0, 0));
                  }}
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

export default ArticlesList;
