import Button from "@/components/atoms/Buttons/Button";
import notFoundIcon from "/404_green.png";
import { useI18n } from "@/i18n/useI18n";
import { ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";

const NotFound = () => {
  const { t, lang } = useI18n();
  return (
    <div
      className={`md:pb-30 pb-10 md:pt-30 pt-25 md:w-[95%] w-[90%] mx-auto flex flex-col items-center md:gap-20 gap-10`}
    >
      <div className={`flex justify-center items-center gap-1`}>
        <Link to={"/"} className={`text-base font-normal text-green-primary`}>
          {t("courses.navigation.homePage")}
        </Link>
        <ChevronLeft
          className={`size-4 ${lang === "en" ? "transform-[rotate(180deg)]" : "transform-[rotate(0deg)]"}`}
          color="#008C78"
        />
        <Link className={`text-base font-normal text-green-primary`}>
          {t("notFound.notFound")}
        </Link>
      </div>
      <div className={`flex flex-col items-center md:gap-15 gap-5 text-center`}>
        <img className={`lg:w-162 md:w-100 w-50`} src={notFoundIcon} />
        <div className={`flex flex-col md:gap-5 gap-2 items-center`}>
          <h5 className={`font-bold lg:text-[40px] md:text-[30px] text-[20px] text-default-black`}>
            {t("notFound.notFound")}
          </h5>
          <p className={`font-bold lg:text-[40px] md:text-[30px] text-[20px] text-default-black`}>
            {t("notFound.description")}
          </p>
        </div>
        <Link to={"/"} className={`rounded-[50px]`}>
          <Button className={`px-3 py-2`} color="authBtn">
            {t("notFound.linkBtn")}
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
