import { useI18n } from "@/i18n/useI18n";
import { ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";

const NotFound = () => {
  const { t } = useI18n();
  return (
    <div>
      <div className={`flex items-center gap-1`}>
        <Link to={"/"} className={`text-[14px] font-normal text-green-primary`}>
          {t("courses.navigation.homePage")}
        </Link>
        <ChevronLeft className={`size-4`} color="#008C78" />
        <Link className={`text-[14px] font-normal text-green-primary`}>
          {t("courses.navigation.coursesPage")}
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
