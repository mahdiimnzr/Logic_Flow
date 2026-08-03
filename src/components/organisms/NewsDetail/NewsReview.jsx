import HandleIdentityEditorJs from "@/components/atoms/EditorJSFormat/EditorDetailValidation";
import { useGetNewsDetails } from "@/core/services/api/newsDetails/newsDetails.service";
import { useI18n } from "@/i18n/useI18n";
import { useParams } from "react-router-dom";

const NewsReview = () => {
  const { id } = useParams();
  const { t } = useI18n();
  const { data: Details } = useGetNewsDetails(id);
  return (
    <div className={`flex flex-col xl:gap-10 gap-8`}>
      <div className="flex flex-col gap-2">
        <span
          className={`xl:text-[18px] text-base font-bold text-default-black`}
        >
          {t("newsDetail.describe")}
        </span>
        <HandleIdentityEditorJs
          desc={Details?.data?.detailsNewsDto?.describe}
        />
      </div>
    </div>
  );
};

export default NewsReview;
