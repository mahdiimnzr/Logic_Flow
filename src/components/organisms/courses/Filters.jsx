import { updateFilters, updateParams } from "@/app/store/actions";
import AccordionMultiple from "@/components/molecules/Accordion/Accordions";
import DatePickerInput from "@/components/molecules/DatePicker/DatePicker";
import CheckBox from "@/components/molecules/Inputs/CheckBox";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useGetCoursesLevels,
  useGetCoursesTechnologies,
  useGetCoursesTypes,
} from "@/core/services/api/courses/courses.service";
import formatDate from "@/core/utils/formatDate";
import formatPrice from "@/core/utils/formatPrice";
import { useI18n } from "@/i18n/useI18n";
import debounce from "debounce";
import { Minus, Plus, Search } from "lucide-react";
import Slider from "rc-slider";
import { useContext, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import SelectModal from "@/components/molecules/Select/Select";
import { rowsOfPages, sortingTypes } from "@/core/constants/courseSortings";
import ThemeContext from "@/app/context/ThemeContext";

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

  const {
    startDate,
    startMonth,
    startValue,
    endDate,
    endMonth,
    endValue,
    selectedLevel,
    isLevelsModalOpen,
    selectedTechnology,
    isTechnologiesModalOpen,
    priceRange,
    isTypesModalOpen,
    selectedTypes,
    searchValue,
  } = useSelector((state) => state.coursesSlice.filters);

  const setFilter = (key, value) => dispatch(updateFilters({ key, value }));

  const startDateObj = startDate ? new Date(startDate) : undefined;
  const startMonthObj = startMonth ? new Date(startMonth) : new Date();
  const endDateObj = endDate ? new Date(endDate) : undefined;
  const endMonthObj = endMonth ? new Date(endMonth) : new Date();

  const skeletonCountCheckBox = new Array(3).fill("");

  const { isLoading: levelsLoading, data: levels } =
    useGetCoursesLevels("CourseLevels");
  const { isLoading: technologiesLoading, data: technologies } =
    useGetCoursesTechnologies("CourseTechnologies");
  const { isLoading: typesLoading, data: types } =
    useGetCoursesTypes("CourseTypes");

  const handleSearch = debounce((value) => {
    const search = value.trim() === "" ? null : value.trim();
    dispatch(updateParams({ key: "Query", value: search }));
  }, 1000);

  const handlePrice = useMemo(
    () =>
      debounce((newValue) => {
        dispatch(updateParams({ key: "CostDown", value: newValue[0] }));
        dispatch(updateParams({ key: "CostUp", value: newValue[1] }));
      }, 1000),
    [dispatch],
  );
  useEffect(() => {
    !levelsLoading &&
      !technologiesLoading &&
      setFilter(searchValue, searchParams.get("Query"));
    setFilter("selectedLevel", searchParams.get("courseLevelId"));
    setFilter("selectedTypes", searchParams.get("CourseTypeId"));
    setFilter(
      "selectedTechnology",
      searchParams.get("ListTech") === null
        ? []
        : Array(searchParams.get("TechCount")).fill(
            searchParams.get("ListTech"),
          ),
    );
    setFilter(
      "priceRange",
      searchParams.get("CostUp") === null &&
        searchParams.get("CostDown") === null
        ? [0, 10000000]
        : [searchParams.get("CostDown"), searchParams.get("CostUp")],
    );
    setFilter("startValue", formatDate(searchParams.get("StartDate")));
    setFilter("endValue", formatDate(searchParams.get("EndDate")));
  }, [levelsLoading, technologiesLoading, typesLoading]);
  return (
    <>
      {sortTypes !== undefined && (
        <div className={`flex flex-col gap-5 lg:hidden justify-between`}>
          <div className={`flex justify-between items-center`}>
            <span
              className={`text-default-black font-normal md:text-base text-[14px]`}
            >
              {t("courses.sorting.sortBy")}
            </span>
            <SelectModal
              items={sortingTypes}
              contentPosition={"popper"}
              contentClassName={`min-w-full! relative! z-100! ${theme ? `bg-[#1e1e1e] text-white` : `bg-white text-[#1E1E1E]`}`}
              defaultValue={"expensive"}
              itemClassName={`cursor-pointer! ${theme ? `focus:bg-[oklch(0.269_0_0)]` : `focus:bg-muted`}`}
              triggerClassName={`border! border-light-gray! rounded-[15px] flex! items-center! gap-1! ring-0! md:px-4! px-2! py-2! h-auto! font-normal! md:text-[14px]! text-[12px]! text-default-black! cursor-pointer! bg-default-light!`}
              value={sortTypes}
              setValue={setSortTypes}
              onValueChange={(event) => {
                setSortTypes(event);
                const sort = sortingTypes.find((value) => event === value.name);
                dispatch(
                  updateParams({ key: "SortingCol", value: sort.sortCol }),
                );
                dispatch(
                  updateParams({ key: "SortType", value: sort.sortType }),
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
              {t("courses.sorting.rowsOf")}
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
                dispatch(updateParams({ key: "RowsOfPage", value: event }));
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
          placeholder={t("courses.filters.searchPlaceHolder")}
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
        value={"coursesStartAndEndDate"}
        className={`bg-default-light p-4 rounded-[15px] shadow-[0px_2px_5px_0px_#000000]/15 dark:shadow-[0px_2px_5px_0px_#ffffff]/15`}
        trigger={t("courses.filters.startAndEndDate")}
        triggerClassName={`hover:no-underline! cursor-pointer! text-default-black! 2xl:text-[18px]! lg:text-base! font-bold! text-right!`}
      >
        <div className={`flex flex-col gap-4`}>
          <DatePickerInput
            label={t("courses.filters.start")}
            date={startDateObj}
            setDate={(val) =>
              setFilter(
                "startDate",
                val instanceof Date ? val.toISOString() : null,
              )
            }
            month={startMonthObj}
            setMonth={(val) =>
              setFilter(
                "startMonth",
                val instanceof Date
                  ? val.toISOString()
                  : new Date().toISOString(),
              )
            }
            value={startValue}
            setValue={(val) => setFilter("startValue", val)}
            onChange={(date) => {
              if (!date) {
                setFilter("startDate", null);
                setFilter("startValue", "");
                dispatch(updateParams({ key: "StartDate", value: null }));
                setSearchParams((params) => {
                  params.delete("StartDate");
                  return params;
                });
                return;
              }
              setFilter("startDate", date.toISOString());
              setFilter("startValue", formatDate(date));
              dispatch(
                updateParams({ key: "StartDate", value: date.toISOString() }),
              );
              setSearchParams((params) => {
                params.set("StartDate", date.toISOString());
                return params;
              });
            }}
          />
          <DatePickerInput
            label={t("courses.filters.end")}
            date={endDateObj}
            setDate={(val) =>
              setFilter(
                "endDate",
                val instanceof Date ? val.toISOString() : null,
              )
            }
            month={endMonthObj}
            setMonth={(val) =>
              setFilter(
                "endMonth",
                val instanceof Date
                  ? val.toISOString()
                  : new Date().toISOString(),
              )
            }
            value={endValue}
            setValue={(val) => setFilter("endValue", val)}
            onChange={(date) => {
              if (!date) {
                setFilter("endDate", null);
                setFilter("endValue", "");
                dispatch(updateParams({ key: "EndDate", value: null }));
                setSearchParams((params) => {
                  params.delete("EndDate");
                  return params;
                });
                return;
              }
              setFilter("endDate", date.toISOString());
              setFilter("endValue", formatDate(date));
              dispatch(
                updateParams({ key: "EndDate", value: date.toISOString() }),
              );
              setSearchParams((params) => {
                params.set("EndDate", date.toISOString());
                return params;
              });
            }}
          />
        </div>
      </AccordionMultiple>
      <AccordionMultiple
        value={"coursesLevel"}
        className={`bg-default-light p-4 rounded-[15px] shadow-[0px_2px_5px_0px_#000000]/15 dark:shadow-[0px_2px_5px_0px_#ffffff]/15`}
        trigger={t("courses.filters.coursesLevel")}
        triggerClassName={`hover:no-underline! cursor-pointer! text-default-black! 2xl:text-[18px]! lg:text-base! font-bold! text-right!`}
      >
        <div className={`flex flex-col gap-4`}>
          {levelsLoading
            ? skeletonCountCheckBox?.map((_, index) => (
                <div
                  key={index}
                  dir="rtl"
                  className={`w-3/10 p-1 flex flex-col gap-5 rounded-[10px] bg-field-silver`}
                >
                  <Skeleton className={`h-3 w-full`} />
                </div>
              ))
            : !isLevelsModalOpen
              ? levels?.status < 400 && levels?.data
                ? levels?.data?.slice(0, 3)?.map((value, index) => (
                    <CheckBox
                      key={index}
                      label={value.levelName}
                      id="courseLevels"
                      labelId={value.id}
                      type="radio"
                      checked={selectedLevel === value.id}
                      onChange={(event) => {
                        setFilter("selectedLevel", value.id);
                        const { checked } = event.target;
                        dispatch(
                          updateParams({
                            key: "courseLevelId",
                            value: checked ? value.id : null,
                          }),
                        );
                        setSearchParams((params) => {
                          checked && params.set("courseLevelId", value.id);
                          !checked && params.delete("courseLevelId", null);
                          return params;
                        });
                      }}
                    />
                  ))
                : null
              : levels?.data?.map((value, index) => (
                  <CheckBox
                    key={index}
                    label={value.levelName}
                    id="courseLevels"
                    labelId={value.id}
                    type="radio"
                    checked={selectedLevel === value.id}
                    onChange={(event) => {
                      setFilter("selectedLevel", value.id);
                      const { checked } = event.target;
                      dispatch(
                        updateParams({
                          key: "courseLevelId",
                          value: checked ? value.id : null,
                        }),
                      );
                      setSearchParams((params) => {
                        checked && params.set("courseLevelId", value.id);
                        !checked && params.delete("courseLevelId", null);
                        return params;
                      });
                    }}
                  />
                ))}
          <CheckBox
            label={"همه"}
            id={"courseLevels"}
            labelId={"selectAllLevels"}
            type="radio"
            checked={selectedLevel === "selectAllLevels"}
            onChange={(event) => {
              setFilter("selectedLevel", "selectAllLevels");
              const { checked } = event.target;
              dispatch(
                updateParams({
                  key: "courseLevelId",
                  value: checked ? null : null,
                }),
              );
              setSearchParams((params) => {
                params.delete("courseLevelId");
                return params;
              });
            }}
          />
          {levels?.data?.length > 3 && (
            <div
              onClick={() => setFilter("isLevelsModalOpen", !isLevelsModalOpen)}
              className={`flex items-center gap-1 cursor-pointer`}
            >
              {!isLevelsModalOpen ? (
                <Plus className={`size-4`} color="#008C78" />
              ) : (
                <Minus className={`size-4`} color="#008C78" />
              )}
              <span className={`text-[#008C78] text-[14px] font-normal`}>
                {!isLevelsModalOpen
                  ? t("courses.filters.showMore")
                  : t("courses.filters.showLess")}
              </span>
            </div>
          )}
        </div>
      </AccordionMultiple>
      <AccordionMultiple
        value={"courseTypes"}
        className={`bg-default-light p-4 rounded-[15px] shadow-[0px_2px_5px_0px_#000000]/15 dark:shadow-[0px_2px_5px_0px_#ffffff]/15`}
        trigger={t("courses.filters.courseTypes")}
        triggerClassName={`hover:no-underline! cursor-pointer! text-default-black! 2xl:text-[18px]! lg:text-base! font-bold! text-right!`}
      >
        <div className={`flex flex-col gap-4`}>
          {typesLoading
            ? skeletonCountCheckBox?.map((_, index) => (
                <div
                  key={index}
                  dir="rtl"
                  className={`w-3/10 p-1 flex flex-col gap-5 rounded-[10px] bg-field-silver`}
                >
                  <Skeleton className={`h-3 w-full`} />
                </div>
              ))
            : !isTypesModalOpen
              ? types?.status < 400 && types?.data
                ? types?.data?.slice(0, 3)?.map((value, index) => (
                    <CheckBox
                      key={index}
                      label={
                        value.typeName === "online"
                          ? "آنلاین"
                          : value.typeName === "online2"
                            ? "حضوری"
                            : value.typeName
                      }
                      id="courseTypes"
                      labelId={value.id}
                      type="radio"
                      checked={selectedTypes === value.id}
                      onChange={(event) => {
                        setFilter("selectedTypes", value.id);
                        const { checked } = event.target;
                        dispatch(
                          updateParams({
                            key: "CourseTypeId",
                            value: checked ? value.id : null,
                          }),
                        );
                        setSearchParams((params) => {
                          checked && params.set("CourseTypeId", value.id);
                          !checked && params.delete("CourseTypeId");
                          return params;
                        });
                      }}
                    />
                  ))
                : null
              : types?.data?.map((value, index) => (
                  <CheckBox
                    key={index}
                    label={
                      value.typeName === "online"
                        ? "آنلاین"
                        : value.typeName === "online2"
                          ? "حضوری"
                          : value.typeName
                    }
                    id="courseTypes"
                    labelId={value.id}
                    type="radio"
                    checked={selectedTypes === value.id}
                    onChange={(event) => {
                      setFilter("selectedTypes", value.id);
                      const { checked } = event.target;
                      dispatch(
                        updateParams({
                          key: "CourseTypeId",
                          value: checked ? value.id : null,
                        }),
                      );
                      setSearchParams((params) => {
                        checked && params.set("CourseTypeId", value.id);
                        !checked && params.delete("CourseTypeId", null);
                        return params;
                      });
                    }}
                  />
                ))}
          <CheckBox
            label={"همه"}
            id={"courseTypes"}
            labelId={"selectAllTypes"}
            type="radio"
            checked={selectedTypes === "selectAllTypes"}
            onChange={(event) => {
              setFilter("selectedTypes", "selectAllTypes");
              const { checked } = event.target;
              dispatch(
                updateParams({
                  key: "CourseTypeId",
                  value: checked ? null : null,
                }),
              );
              setSearchParams((params) => {
                params.delete("CourseTypeId");
                return params;
              });
            }}
          />
          {types?.data?.length > 3 && (
            <div
              onClick={() => setFilter("isLevelsModalOpen", !isTypesModalOpen)}
              className={`flex items-center gap-1 cursor-pointer`}
            >
              {!isTypesModalOpen ? (
                <Plus className={`size-4`} color="#008C78" />
              ) : (
                <Minus className={`size-4`} color="#008C78" />
              )}
              <span className={`text-[#008C78] text-[14px] font-normal`}>
                {!isTypesModalOpen
                  ? t("courses.filters.showMore")
                  : t("courses.filters.showLess")}
              </span>
            </div>
          )}
        </div>
      </AccordionMultiple>
      <AccordionMultiple
        value={"courseTechnologies"}
        className={`bg-default-light p-4 rounded-[15px] shadow-[0px_2px_5px_0px_#000000]/15 dark:shadow-[0px_2px_5px_0px_#ffffff]/15`}
        trigger={t("courses.filters.technologies")}
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
                      label={value.techName}
                      id={value.id}
                      labelId={value.id}
                      type="checkbox"
                      checked={selectedTechnology.includes(value.id)}
                      onChange={(event) => {
                        const { checked } = event.target;
                        const newList = checked
                          ? [...selectedTechnology, value.id]
                          : selectedTechnology.filter((id) => id !== value.id);
                        setFilter("selectedTechnology", newList);
                        dispatch(
                          updateParams({
                            key: "ListTech",
                            value: newList.length > 0 ? String(newList) : null,
                          }),
                        );
                        dispatch(
                          updateParams({
                            key: "TechCount",
                            value: newList.length > 0 ? newList.length : null,
                          }),
                        );
                        setSearchParams((params) => {
                          newList.length > 0 &&
                            params.set("ListTech", String(newList));
                          newList.length > 0 &&
                            params.set("TechCount", newList.length);
                          newList.length === 0 && params.delete("ListTech");
                          newList.length === 0 && params.delete("TechCount");
                          return params;
                        });
                      }}
                    />
                  ))
                : null
              : technologies?.data?.map((value, index) => (
                  <CheckBox
                    key={index}
                    label={value.techName}
                    id={value.id}
                    labelId={value.id}
                    type="checkbox"
                    checked={selectedTechnology.includes(value.id)}
                    onChange={(event) => {
                      const { checked } = event.target;
                      const newList = checked
                        ? [...selectedTechnology, value.id]
                        : selectedTechnology.filter((id) => id !== value.id);
                      setFilter("selectedTechnology", newList);
                      dispatch(
                        updateParams({
                          key: "ListTech",
                          value: newList.length > 0 ? String(newList) : null,
                        }),
                      );
                      dispatch(
                        updateParams({
                          key: "TechCount",
                          value: newList.length > 0 ? newList.length : null,
                        }),
                      );
                      setSearchParams((params) => {
                        newList.length > 0 &&
                          params.set("ListTech", String(newList));
                        newList.length > 0 &&
                          params.set("TechCount", newList.length);
                        newList.length === 0 && params.delete("ListTech");
                        newList.length === 0 && params.delete("TechCount");
                        return params;
                      });
                    }}
                  />
                ))}
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
                  ? t("courses.filters.showMore")
                  : t("courses.filters.showLess")}
              </span>
            </div>
          )}
        </div>
      </AccordionMultiple>
      <AccordionMultiple
        value={"coursePriceRange"}
        className={`bg-default-light p-4 rounded-[15px] shadow-[0px_2px_5px_0px_#000000]/15 dark:shadow-[0px_2px_5px_0px_#ffffff]/15`}
        trigger={t("courses.filters.priceRange")}
        triggerClassName={`hover:no-underline! cursor-pointer! text-default-black! 2xl:text-[18px]! lg:text-base! font-bold! text-right!`}
      >
        <div className={`flex flex-col gap-2 p-3 pb-0`}>
          <Slider
            range
            min={0}
            max={10000000}
            reverse={true}
            onChange={(value) => {
              setFilter("priceRange", value);
              handlePrice(value);
              setSearchParams((params) => {
                params.set("CostDown", value[0]);
                params.set("CostUp", value[1]);
                return params;
              });
            }}
            step={10000}
            defaultValue={priceRange}
            railStyle={{ backgroundColor: "#A6A6A6", height: 3 }}
            trackStyle={{ backgroundColor: "#008C78", height: 3 }}
            handleStyle={{
              borderColor: "#008C78",
              backgroundColor: "#008C78",
              width: 16,
              height: 16,
              opacity: 1,
              boxShadow: "none",
              marginTop: -6,
            }}
          />
          <div className={`flex items-center justify-between`}>
            <p
              className={`font-normal text-[12px] text-default-black h-5 content-end`}
            >
              {formatPrice(priceRange[0])}
            </p>
            <p
              className={`font-normal text-[12px] text-default-black h-5 content-end`}
            >
              {formatPrice(priceRange[1])}
            </p>
          </div>
        </div>
      </AccordionMultiple>
    </>
  );
};

export default Filters;
