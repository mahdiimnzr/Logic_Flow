import { updateParams } from "@/app/store/actions";
import AccordionMultiple from "@/components/molecules/Accordion/Accordions";
import DatePickerInput from "@/components/molecules/DatePicker/DatePicker";
import CheckBox from "@/components/molecules/Inputs/CheckBox";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useGetCoursesLevels,
  useGetCoursesTechnologies,
} from "@/core/services/api/courses/courses.service";
import formatDate from "@/core/utils/formatDate";
import formatPrice from "@/core/utils/formatPrice";
import { useI18n } from "@/i18n/useI18n";
import debounce from "debounce";
import { Minus, Plus, Search } from "lucide-react";
import Slider from "rc-slider";
import { useMemo, useState } from "react";
import { useDispatch } from "react-redux";

const Filters = () => {
  const { t } = useI18n();
  const dispatch = useDispatch();

  const skeletonCountCheckBox = new Array(3).fill("");
  const [startDate, setStartDate] = useState(undefined);
  const [startMonth, setStartMonth] = useState(new Date());
  const [startValue, setStartValue] = useState("");
  const [startOpen, setStartOpen] = useState(false);
  const [endDate, setEndDate] = useState(undefined);
  const [endMonth, setEndMonth] = useState(new Date());
  const [endValue, setEndValue] = useState("");
  const [endOpen, setEndOpen] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [levelsOpen, setLevelsOpen] = useState(false);
  const [selectedTechnology, setSelectedTechnology] = useState([]);
  const [technologiesOpen, setTechnologiesOpen] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 10000000]);

  const { isLoading: levelsLoading, data: levels } =
    useGetCoursesLevels("CourseLevels");
  const { isLoading: technologiesLoading, data: technologies } =
    useGetCoursesTechnologies("CourseTechnologies");

  const handleSearch = debounce((value) => {
    const searchValue = value.trim() === "" ? null : value.trim();
    dispatch(
      updateParams({
        key: "Query",
        value: searchValue,
      }),
    );
  }, 1000);
  const handlePrice = useMemo(
    () =>
      debounce((newValue) => {
        dispatch(updateParams({ key: "CostDown", value: newValue[0] }));
        dispatch(updateParams({ key: "CostUp", value: newValue[1] }));
      }, 1000),
    [dispatch],
  );
  return (
    <>
      <div
        className={`bg-default-light shadow-[0px_2px_5px_0px_#000000]/15 dark:shadow-[0px_2px_5px_0px_#ffffff]/15 rounded-[15px] py-4 px-2 flex items-center justify-between`}
      >
        <input
          className={`text-base font-normal text-field-silver placeholder:text-field-silver outline-none w-9/10`}
          placeholder={t("courses.filters.searchPlaceHolder")}
          type="text"
          onChange={(event) => handleSearch(event.target.value)}
        />
        <Search className={`w-1/10`} color="#848484" />
      </div>
      <AccordionMultiple
        value={"coursesStartAndEndDate"}
        className={`bg-default-light p-4 rounded-[15px] shadow-[0px_2px_5px_0px_#000000]/15 dark:shadow-[0px_2px_5px_0px_#ffffff]/15`}
        trigger={t("courses.filters.startAndEndDate")}
        triggerClassName={`hover:no-underline! cursor-pointer! text-default-black! text-[18px]! font-bold!`}
      >
        <div className={`flex flex-col gap-4`}>
          <DatePickerInput
            label={t("courses.filters.start")}
            date={startDate}
            setDate={setStartDate}
            month={startMonth}
            setMonth={setStartMonth}
            value={startValue}
            setValue={setStartValue}
            open={startOpen}
            setOpen={setStartOpen}
            onChange={(date) => {
              if (!date) {
                setStartDate(undefined);
                setStartValue("");
                dispatch(
                  updateParams({
                    key: "StartDate",
                    value: null,
                  }),
                );
                return;
              }
              setStartDate(date);
              setStartValue(formatDate(date));
              setStartOpen(false);
              dispatch(
                updateParams({
                  key: "StartDate",
                  value: date.toISOString(),
                }),
              );
            }}
          />
          <DatePickerInput
            label={t("courses.filters.end")}
            date={endDate}
            setDate={setEndDate}
            month={endMonth}
            setMonth={setEndMonth}
            value={endValue}
            setValue={setEndValue}
            open={endOpen}
            setOpen={setEndOpen}
            onChange={(date) => {
              if (!date) {
                setEndDate(undefined);
                setEndValue("");
                dispatch(
                  updateParams({
                    key: "EndDate",
                    value: null,
                  }),
                );
                return;
              }
              setEndDate(date);
              setEndValue(formatDate(date));
              setEndOpen(false);
              dispatch(
                updateParams({
                  key: "EndDate",
                  value: date.toISOString(),
                }),
              );
            }}
          />
        </div>
      </AccordionMultiple>
      <AccordionMultiple
        value={"coursesLevel"}
        className={`bg-default-light p-4 rounded-[15px] shadow-[0px_2px_5px_0px_#000000]/15 dark:shadow-[0px_2px_5px_0px_#ffffff]/15`}
        trigger={t("courses.filters.coursesLevel")}
        triggerClassName={`hover:no-underline! cursor-pointer! text-default-black! text-[18px]! font-bold!`}
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
            : !levelsOpen
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
                        setSelectedLevel(value.id);
                        const { checked } = event.target;
                        if (checked) {
                          dispatch(
                            updateParams({
                              key: "courseLevelId",
                              value: value.id,
                            }),
                          );
                        } else {
                          dispatch(
                            updateParams({
                              key: "courseLevelId",
                              value: null,
                            }),
                          );
                        }
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
                      setSelectedLevel(value.id);
                      const { checked } = event.target;
                      if (checked) {
                        dispatch(
                          updateParams({
                            key: "courseLevelId",
                            value: value.id,
                          }),
                        );
                      } else {
                        dispatch(
                          updateParams({
                            key: "courseLevelId",
                            value: null,
                          }),
                        );
                      }
                    }}
                  />
                ))}
          {levels?.data?.length > 3 && (
            <div
              onClick={() => setLevelsOpen(!levelsOpen)}
              className={`flex items-center gap-1 cursor-pointer`}
            >
              {!levelsOpen ? (
                <Plus className={`size-4`} color="#008C78" />
              ) : (
                <Minus className={`size-4`} color="#008C78" />
              )}
              <span className={`text-green-primary text-[14px] font-normal`}>
                {!levelsOpen
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
        triggerClassName={`hover:no-underline! cursor-pointer! text-default-black! text-[18px]! font-bold!`}
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
            : !technologiesOpen
              ? technologies?.status < 400 && levels?.data
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
                        setSelectedTechnology(newList);
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
                      setSelectedTechnology(newList);
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
                    }}
                  />
                ))}
          {technologies?.data?.length > 3 && (
            <div
              onClick={() => setTechnologiesOpen(!technologiesOpen)}
              className={`flex items-center gap-1 cursor-pointer`}
            >
              {!technologiesOpen ? (
                <Plus className={`size-4`} color="#008C78" />
              ) : (
                <Minus className={`size-4`} color="#008C78" />
              )}
              <span className={`text-green-primary text-[14px] font-normal`}>
                {!technologiesOpen
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
        triggerClassName={`hover:no-underline! cursor-pointer! text-default-black! text-[18px]! font-bold!`}
      >
        <div className={`flex flex-col gap-2 p-3 pb-0`}>
          <Slider
            range
            min={0}
            max={10000000}
            reverse={true}
            onChange={(value) => {
              setPriceRange(value);
              handlePrice(value);
            }}
            step={10000}
            defaultValue={priceRange}
            railStyle={{
              backgroundColor: "#A6A6A6",
              height: 3,
            }}
            trackStyle={{
              backgroundColor: "#008C78",
              height: 3,
            }}
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
