import { useGetNewsDetails } from "@/core/services/api/newsDetails/newsDetails.service";
import { useParams } from "react-router-dom";

const NewsReview = () => {
  const { id } = useParams();
  const { isLoading, data: Details } = useGetNewsDetails(id);
  return (
    <div className={`flex flex-col xl:gap-10 gap-8`}>
      <div>
        <span
          className={`xl:text-[18px] text-base font-bold text-default-black`}
        >
          توضیحات
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
