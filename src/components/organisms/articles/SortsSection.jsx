import {
  updateArticlesFilters,
  updateArticlesParams,
} from "@/app/store/actions";
import DrawerComponents from "@/components/molecules/Drawer/Drawer";
import SelectModal from "@/components/molecules/Select/Select";
import { DrawerClose } from "@/components/ui/drawer";
import { rowsOfPages, sortingTypes } from "@/core/constants/articlesSorting";
import { Copy, ListFilterPlus, Search, X } from "lucide-react";
import Filters from "./Filters";
import debounce from "debounce";
import ThemeContext from "@/app/context/ThemeContext";
import { useCallback, useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useI18n } from "@/i18n/useI18n";
import View from "@/components/molecules/View/View";
import Button from "@/components/atoms/Buttons/Button";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";

const SortsSection = ({
  searchParams,
  setSearchParams,
  gridView,
  setGridView,
  rowPageCount,
  setRowPageCount,
}) => {
  const { t, lang } = useI18n();
  const { pathname, search } = useLocation();
  const dispatch = useDispatch();
  const { theme } = useContext(ThemeContext);
  const [sortTypes, setSortTypes] = useState("newest");
  const [deleteFiltersShow, setDeleteFiltersShow] = useState(false);

  const { selectedTechnology, searchValue } = useSelector(
    (state) => state.articlesSlice.filters,
  );

  const setParams = (key, value) =>
    dispatch(updateArticlesParams({ key: [key], value: value }));
  const setFilters = (key, value) =>
    dispatch(updateArticlesFilters({ key: [key], value: value }));

  const handleShowDeleteFilters = useCallback(() => {
    if (
      selectedTechnology === null &&
      (searchValue === "" || searchValue === null)
    ) {
      setDeleteFiltersShow(false);
    } else {
      setDeleteFiltersShow(true);
    }
  }, [selectedTechnology, searchValue]);
  const handleDeleteFilters = () => {
    setFilters("selectedTechnology", null);
    setFilters("searchValue", "");
    setSearchParams(() => {
      searchParams.delete("Query");
      searchParams.delete("NewsCategoryId");
    });
    setParams("Query", null);
    setParams("NewsCategoryId", null);
  };
  const handleSearch = debounce((value) => {
    const search = value.trim() === "" ? null : value.trim();
    dispatch(updateArticlesParams({ key: "Query", value: search }));
  }, 1000);
  useEffect(() => {
    handleShowDeleteFilters();
  }, [handleShowDeleteFilters]);
  return (
    <div
      className={`bg-default-light rounded-[15px] shadow-[0px_2px_5px_0_#000000]/15 dark:shadow-[0px_2px_5px_0_#ffffff]/15 sm:p-4 px-2 py-1 flex items-center justify-between`}
    >
      <div
        className={`md:w-3/10 sm:w-4/10 w-6/10 bg-default-light shadow-[0px_2px_5px_0px_#000000]/15 dark:shadow-[0px_2px_5px_0px_#ffffff]/15 rounded-[15px] py-2 px-2 flex items-center justify-between lg:hidden`}
      >
        <input
          className={`sm:text-base text-[12px] font-normal text-field-silver placeholder:text-field-silver outline-none w-9/10`}
          placeholder={t("articles.filters.searchPlaceHolder")}
          type="text"
          onChange={(event) => {
            handleSearch(event.target.value);
            setSearchParams((params) => {
              event.target.value !== null &&
                params.set("Query", event.target.value);
              event.target.value.trim() === "" && params.delete("Query");
              return params;
            });
          }}
        />
        <Search
          className={`w-1/10 ${lang === "en" ? "transform-[rotate(90deg)]" : "transform-[rotate(0deg)]"}`}
          color="#848484"
        />
      </div>
      <div className={`lg:flex hidden items-center xl:gap-4 lg:gap-2`}>
        <span
          className={`text-default-black font-normal md:text-base lg:text-[14px] xl:text-base`}
        >
          {t("articles.sorting.sortBy")}
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
            const sort = sortingTypes.find((value) => event === value.name);
            dispatch(
              updateArticlesParams({ key: "SortingCol", value: sort.sortCol }),
            );
            dispatch(
              updateArticlesParams({ key: "SortType", value: sort.sortType }),
            );
          }}
        />
        <span
          className={`text-default-black font-normal md:text-base lg:text-[14px] xl:text-base`}
        >
          {t("articles.sorting.rowsOf")}
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
            dispatch(updateArticlesParams({ key: "RowsOfPage", value: event }));
          }}
        />
        <Button
          onClick={() => {
            const webPath = "localhost:5173" + pathname + search;
            toast.success(t("articles.filters.copy"));
            navigator.clipboard.writeText(webPath);
          }}
          color={"authBtn"}
          className={`p-2`}
        >
          <Copy className={`hidden lg:block`} />
        </Button>
        {deleteFiltersShow && (
          <Button
            onClick={handleDeleteFilters}
            color={"authBtn"}
            className={`p-2 flex items-center justify-center gap-1`}
          >
            <p className={`hidden xl:block`}>
              {t("courses.filters.deleteFilter")}
            </p>
            <X className={`hidden lg:block`} />
          </Button>
        )}
      </div>
      <View view={gridView} setView={setGridView} />
      <div className="block lg:hidden h-11">
        <DrawerComponents
          direction="bottom"
          theme={theme}
          trigger={
            <>
              <div
                className={`px-3 py-2 sm:block lg:hidden hidden bg-green-primary text-white font-bold rounded-[100px] text-base cursor-pointer`}
              >
                {t("articles.filters.filtersName")}
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
              <span
                className={`text-default-black text-[20px] flex gap-2 items-center`}
              >
                <p> {t("articles.filters.filtersName")}</p>
                <Button
                  onClick={() => {
                    const webPath = "localhost:5173" + pathname + search;
                    toast.success("کپی شد!");
                    navigator.clipboard.writeText(webPath);
                  }}
                  color={"authBtn"}
                  className={`xl:px-3 xl:py-2 p-2 block lg:hidden`}
                >
                  <Copy />
                </Button>
                {deleteFiltersShow && (
                  <Button
                    onClick={handleDeleteFilters}
                    color={"authBtn"}
                    className={`p-2 flex items-center justify-center gap-1`}
                  >
                    <X className={`block lg:hidden`} />
                  </Button>
                )}
              </span>
              <DrawerClose asChild>
                <div
                  className={`px-2 py-1 font-bold text-red-error text-[14px] rounded-[64px] border border-red-error w-fit cursor-pointer`}
                >
                  {t("articles.filters.closeBtn")}
                </div>
              </DrawerClose>
            </div>
            <Filters
              sortTypes={sortTypes}
              setSortTypes={setSortTypes}
              rowPageCount={rowPageCount}
              setRowPageCount={setRowPageCount}
              searchParams={searchParams}
              setSearchParams={setSearchParams}
            />
          </div>
        </DrawerComponents>
      </div>
    </div>
  );
};

export default SortsSection;
