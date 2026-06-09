import ThemeContext from "@/app/context/ThemeContext";
import Button from "@/components/atoms/Buttons/Button";
import TeachersCard from "@/components/molecules/Cards/TeachersCard";
import SelectModal from "@/components/molecules/Select/Select";
import { rowsOfPages } from "@/core/constants/articlesSorting";
import { useGetTeachers } from "@/core/services/api/teachers/teacher.service";
import { useI18n } from "@/i18n/useI18n";
import { ChevronLeft, Search } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

const TeachersInformation = () => {
  const { t, lang } = useI18n();
  const [rowPageCount, setRowPageCount] = useState(12);
  const { theme } = useContext(ThemeContext);
  const { isLoading, data: Teachers, refetch } = useGetTeachers();

  useEffect(() => {
    refetch();
  }, []);
  return (
    <div className={` flex flex-col gap-8.5 items-center`}>
      <div className={`flex flex-col items-center gap-4`}>
        <div className={`flex items-center justify-center gap-1`}>
          <Link
            className={`text-[14px] font-normal text-green-primary`}
            to={"/"}
          >
            {t("teachers.home")}
          </Link>
          <ChevronLeft
            className={`size-4 ${lang === "en" ? "transform-[rotate(180deg)]" : "transform-[rotate(0deg)]"}`}
            color="#008C78"
          />

          <Link className={`text-[14px] font-normal text-green-primary`}>
            {t("teachers.teacher")}
          </Link>
        </div>
        <span className={`text-default-black md:text-[32px] font-bold`}>
          {t("teachers.teacher")}
        </span>
      </div>
      <div className={`  w-full flex flex-col gap-8`}>
        <div
          className={` bg-default-light rounded-[15px] shadow-[0px_2px_5px_0_#000000]/15 dark:shadow-[0px_2px_5px_0_#ffffff]/15 p-3 flex items-center justify-between`}
        >
          <div className={`flex items-center lg:gap-5.5 gap-4 `}>
            <div
              className={` xl:w-162 lg:w-150 md:w-120 sm:w-100  flex justify-between border border-light-gray p-3 rounded-[15px]`}
            >
              <input
                type="text"
                placeholder={t("teachers.inputPlaceHolder")}
                className={`text-base font-normal text-field-silver placeholder:text-field-silver outline-none w-9/10`}
              />
              <Search
                className={`w-0.5/10 ${lang === "en" ? "transform-[rotate(90deg)]" : "transform-[rotate(0deg)]"}`}
                color="#848484"
              />
            </div>
            <div className={`flex items-center lg:gap-4 gap-2`}>
              <span
                className={`text-default-black font-normal lg:text-base md:text-[14px]`}
              >
                تعداد در صفحه:
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
                  //   dispatch(
                  //     updateArticlesParams({ key: "RowsOfPage", value: event }),
                  //   );
                }}
              />
            </div>
          </div>
          <Button
            color={"searchBtn"}
            className={`w-[125px] h-[46px] text-[14px] text-default-light sm:block hidden `}
          >
            {t("teachers.searchBtn")}
          </Button>
        </div>
      </div>
      <div
        className={`w-full grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3  sm:grid-cols-2 grid-cols-1 gap-8`}
      >
        {Teachers?.data?.map((value, index) => (
          <TeachersCard
            key={index}
            fullName={value.fullName}
            courseCounts={value.courseCounts}
            teacherId={value.teacherId}
            pictureAddress={value.pictureAddress}
            linkdinProfileLink={value.linkdinProfileLink}
          />
        ))}
      </div>
    </div>
  );
};

export default TeachersInformation;
