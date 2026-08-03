import NewsDetailInformation from "@/components/organisms/NewsDetail/NewsDetailInformation";
import { useEffect } from "react";

const NewsDetail = () => {
  useEffect(() => {
    window.scroll(0, 0);
  }, []);
  return (
    <div className={`md:pb-30 pb-10 md:pt-30 pt-20 md:w-[95%] w-[90%] mx-auto`}>
      <NewsDetailInformation />
    </div>
  );
};

export default NewsDetail;
