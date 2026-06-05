import {
  updateArticlesFilters,
  updateArticlesParams,
} from "@/app/store/actions";
import AccordionMultiple from "@/components/molecules/Accordion/Accordions";
import CheckBox from "@/components/molecules/Inputs/CheckBox";
import { Skeleton } from "@/components/ui/skeleton";
import { useI18n } from "@/i18n/useI18n";
import debounce from "debounce";
import { Minus, Plus, Search } from "lucide-react";
import { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SelectModal from "@/components/molecules/Select/Select";
import { rowsOfPages, sortingTypes } from "@/core/constants/articlesSorting";
import ThemeContext from "@/app/context/ThemeContext";
import { useGetArticlesTechnologies } from "@/core/services/api/articles/articles.service";

const Filters = ({
  sortTypes,
  setSortTypes,
  rowPageCount,
  setRowPageCount,
  searchParams,
  setSearchParams,
}) => {
  const { t, lang } = useI18n();
  const dispatch = useDispatch();
  const { theme } = useContext(ThemeContext);

  const { selectedTechnology, isTechnologiesModalOpen } = useSelector(
    (state) => state.articlesSlice.filters,
  );

  const setFilter = (key, value) =>
    dispatch(updateArticlesFilters({ key, value }));

  const skeletonCountCheckBox = new Array(3).fill("");

  const { isLoading: technologiesLoading, data: technologies } =
    useGetArticlesTechnologies("NewsTechnologies");

  const handleSearch = debounce((value) => {
    const search = value.trim() === "" ? null : value.trim();
    dispatch(updateArticlesParams({ key: "Query", value: search }));
  }, 1000);

  useEffect(() => {
    !technologiesLoading &&
      dispatch(
        updateArticlesParams({
          key: "Query",
          value: searchParams.get("Query"),
        }),
      );
    dispatch(
      updateArticlesParams({
        key: "NewsCategoryId",
        value: searchParams.get("NewsCategoryId"),
      }),
    );
    setFilter("selectedTechnology", searchParams.get("NewsCategoryId"));
  }, [technologiesLoading]);
  console.log(searchParams.get("NewsCategoryId"));
  return (
    <>
      {sortTypes !== undefined && (
        <div className={`flex flex-col gap-5 lg:hidden justify-between`}>
          <div className={`flex justify-between items-center`}>
            <span
              className={`text-default-black font-normal md:text-base text-[14px]`}
            >
              {t("articles.sorting.sortBy")}
            </span>
            <SelectModal
              items={sortingTypes}
              contentPosition={"popper"}
              contentClassName={`min-w-full! relative! z-100! ${theme ? `bg-[#1e1e1e] text-white` : `bg-white text-[#1E1E1E]`}`}
              defaultValue={"newest"}
              itemClassName={`cursor-pointer! ${theme ? `focus:bg-[oklch(0.269_0_0)]` : `focus:bg-muted`}`}
              triggerClassName={`border! border-light-gray! rounded-[15px] flex! items-center! gap-1! ring-0! md:px-4! px-2! py-2! h-auto! font-normal! md:text-[14px]! text-[12px]! text-default-black! cursor-pointer! bg-default-light!`}
              value={sortTypes}
              setValue={setSortTypes}
              onValueChange={(event) => {
                setSortTypes(event);
                const sort = sortingTypes.find((value) => event === value.name);
                dispatch(
                  updateArticlesParams({
                    key: "SortingCol",
                    value: sort.sortCol,
                  }),
                );
                dispatch(
                  updateArticlesParams({
                    key: "SortType",
                    value: sort.sortType,
                  }),
                );
                setSearchParams((params) => {
                  params.set("SortingCol", sort.sortCol);
                  params.set("SortType", sort.sortType);
                  return params;
                });
              }}
            />
          </div>
          <div className={`flex justify-between items-center`}>
            <span
              className={`text-default-black font-normal md:text-base text-[14px]`}
            >
              {t("articles.sorting.rowsOf")}
            </span>
            <SelectModal
              items={rowsOfPages}
              contentPosition={"popper"}
              contentClassName={`min-w-full! relative! z-100! ${theme ? `bg-[#1e1e1e] text-white` : `bg-white text-[#1E1E1E]`}`}
              defaultValue={12}
              itemClassName={`cursor-pointer! ${theme ? `focus:bg-[oklch(0.269_0_0)]` : `focus:bg-muted`}`}
              triggerClassName={`border! border-light-gray! rounded-[15px] flex! items-center! gap-1! ring-0! md:px-4! px-2! py-2!px-4! py-2! h-auto! font-normal! md:text-[14px]! text-[12px]! text-default-black! cursor-pointer! bg-default-light!`}
              value={rowPageCount}
              setValue={setRowPageCount}
              onValueChange={(event) => {
                setRowPageCount(event);
                dispatch(
                  updateArticlesParams({ key: "RowsOfPage", value: event }),
                );
                setSearchParams((params) => {
                  params.set("RowsOfPage", event);
                  return params;
                });
              }}
            />
          </div>
        </div>
      )}
      <div
        className={`bg-default-light shadow-[0px_2px_5px_0px_#000000]/15 dark:shadow-[0px_2px_5px_0px_#ffffff]/15 rounded-[15px] py-4 px-2 lg:flex items-center justify-between hidden`}
      >
        <input
          className={`text-base font-normal text-field-silver placeholder:text-field-silver outline-none w-9/10`}
          placeholder={t("articles.filters.searchPlaceHolder")}
          type="text"
          onChange={(event) => {
            handleSearch(event.target.value);
            setSearchParams((params) => {
              event.target.value.trim !== "" &&
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
      <AccordionMultiple
        value={"articlesTechnology"}
        className={`bg-default-light p-4 rounded-[15px] shadow-[0px_2px_5px_0px_#000000]/15 dark:shadow-[0px_2px_5px_0px_#ffffff]/15`}
        trigger={t("articles.filters.technologies")}
        triggerClassName={`hover:no-underline! cursor-pointer! text-default-black! 2xl:text-[18px]! lg:text-base! font-bold! text-right!`}
      >
        <div className={`flex flex-col gap-4`}>
          {technologiesLoading
            ? skeletonCountCheckBox?.map((_, index) => (
                <div
                  key={index}
                  dir="rtl"
                  className={`w-3/10 p-1 flex flex-col gap-5 rounded-[10px] bg-field-silver`}
                >
                  <Skeleton className={`h-3 w-full`} />
                </div>
              ))
            : !isTechnologiesModalOpen
              ? technologies?.status < 400 && technologies?.data
                ? technologies?.data?.slice(0, 3)?.map((value, index) => (
                    <CheckBox
                      key={index}
                      label={value.categoryName}
                      id="courseTechnologies"
                      labelId={value.id}
                      type="radio"
                      checked={selectedTechnology === value.id}
                      onChange={(event) => {
                        setFilter("selectedTechnology", value.id);
                        const { checked } = event.target;
                        dispatch(
                          updateArticlesParams({
                            key: "NewsCategoryId",
                            value: checked ? value.id : null,
                          }),
                        );
                        setSearchParams((params) => {
                          checked && params.set("NewsCategoryId", value.id);
                          !checked && params.delete("NewsCategoryId", null);
                          return params;
                        });
                      }}
                    />
                  ))
                : null
              : technologies?.data?.map((value, index) => (
                  <CheckBox
                    key={index}
                    label={value.categoryName}
                    id="courseTechnologies"
                    labelId={value.id}
                    type="radio"
                    checked={selectedTechnology === value.id}
                    onChange={(event) => {
                      setFilter("selectedLevel", value.id);
                      const { checked } = event.target;
                      dispatch(
                        updateArticlesParams({
                          key: "NewsCategoryId",
                          value: checked ? value.id : null,
                        }),
                      );
                      setSearchParams((params) => {
                        checked && params.set("NewsCategoryId", value.id);
                        !checked && params.delete("NewsCategoryId", null);
                        return params;
                      });
                    }}
                  />
                ))}
          <CheckBox
            label={"همه"}
            id={"courseTechnologies"}
            labelId={"selectAllLevels"}
            type="radio"
            checked={selectedTechnology === "selectAllLevels"}
            onChange={(event) => {
              setFilter("selectedTechnology", "selectAllLevels");
              const { checked } = event.target;
              dispatch(
                updateArticlesParams({
                  key: "NewsCategoryId",
                  value: checked ? null : null,
                }),
              );
              setSearchParams((params) => {
                params.delete("NewsCategoryId");
                return params;
              });
            }}
          />
          {technologies?.data?.length > 3 && (
            <div
              onClick={() =>
                setFilter("isTechnologiesModalOpen", !isTechnologiesModalOpen)
              }
              className={`flex items-center gap-1 cursor-pointer`}
            >
              {!isTechnologiesModalOpen ? (
                <Plus className={`size-4`} color="#008C78" />
              ) : (
                <Minus className={`size-4`} color="#008C78" />
              )}
              <span className={`text-[#008C78] text-[14px] font-normal`}>
                {!isTechnologiesModalOpen
                  ? t("articles.filters.showMore")
                  : t("articles.filters.showLess")}
              </span>
            </div>
          )}
        </div>
      </AccordionMultiple>
    </>
  );
};

export default Filters;
