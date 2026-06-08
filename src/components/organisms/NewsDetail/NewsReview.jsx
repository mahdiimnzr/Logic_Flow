import { useGetNewsDetails } from "@/core/services/api/newsDetails/newsDetails.service";
import { useI18n } from "@/i18n/useI18n";
import { useParams } from "react-router-dom";

const NewsReview = () => {
  const { id } = useParams();
  const { t } = useI18n();
  const { data: Details } = useGetNewsDetails(id);
  return (
    <div className={`flex flex-col xl:gap-10 gap-8`}>
      <div>
        <span
          className={`xl:text-[18px] text-base font-bold text-default-black`}
        >
          {t("newsDetail.describe")}
        </span>
        <p
          className={`text-field-silver xl:text-base text-[14px] font-normal leading-loose`}
        >
          {Details?.data?.detailsNewsDto?.describe}
        </p>
      </div>
    </div>
  );
};

export default NewsReview;
