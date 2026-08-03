import ImageFallback from "@/components/atoms/ImageFallBack/ImageFallBack";
import LoadingSvg from "@/core/icons/LoadingSvg";
import { useGetCourseReceipt } from "@/core/services/api/userPanel/userPanel.service";
import formatDate from "@/core/utils/formatDate";
import formatPrice from "@/core/utils/formatPrice";
import { useI18n } from "@/i18n/useI18n";
import fallback from "../../../assets/images/coursePng.png";

const Receipt = ({ isOpen, setIsOpen, props }) => {
  const { courseId } = props;
  const { t } = useI18n();
  const { isLoading, data: courseReceipt } = useGetCourseReceipt(courseId);
  return (
    <div
      className={`size-full fixed transition-all ${isOpen ? "visible opacity-100" : "invisible opacity-0"} right-0 top-0 z-100 flex items-center justify-center`}
    >
      <div
        className={`size-full absolute top-0 right-0 bg-black/50 backdrop-blur-[2px]`}
      ></div>
      <div
        className={`${isOpen ? "mt-0" : "mt-10"} transition-all sm:p-8 p-4 bg-default-light rounded-[24px] relative xl:w-4/10 sm:w-7/10 w-8/10 max-h-[calc(100vh-64px)] overflow-y-auto no-scrollbar flex flex-col items-center gap-8`}
      >
        {isLoading ? (
          <LoadingSvg className={`h-full!`} />
        ) : (
          <>
            <div className={`flex flex-col gap-5 w-full`}>
              <ImageFallback
                src={courseReceipt?.data[0]?.course?.imageAddress}
                fallback={fallback}
                className={`md:w-100 md:h-70 w-70 h-40 rounded-[24px] mx-auto`}
              />
              <div
                className={`flex md:flex-row flex-col gap-3 text-center items-center justify-between pb-4 border-b border-light-gray`}
              >
                <p className={`text-default-black text-base font-medium`}>
                  {t("userPanel.myCoursesSection.courseTitle")}
                </p>
                <p className={`text-default-black text-[18px] font-bold`}>
                  {courseReceipt?.data[0]?.course?.title}
                </p>
              </div>
              <div
                className={`flex md:flex-row flex-col gap-3 text-center items-center justify-between pb-4 border-b border-light-gray`}
              >
                <p className={`text-default-black text-base font-medium`}>
                  {t("userPanel.myCoursesSection.coursePrice")}
                </p>
                <p className={`text-default-black text-[18px] font-bold`}>
                  {formatPrice(courseReceipt?.data[0]?.course?.cost)}{" "}
                  {t("userPanel.myCoursesSection.toman")}
                </p>
              </div>
              <div
                className={`flex md:flex-row flex-col gap-3 text-center items-center justify-between pb-4 border-b border-light-gray`}
              >
                <p className={`text-default-black text-base font-medium`}>
                  {t("userPanel.myCoursesSection.coursePayMount")}
                </p>
                <p className={`text-default-black text-[18px] font-bold`}>
                  {formatPrice(courseReceipt?.data[0]?.paid)}{" "}
                  {t("userPanel.myCoursesSection.toman")}
                </p>
              </div>
              <div
                className={`flex md:flex-row flex-col gap-3 text-center items-center justify-between pb-4 border-b border-light-gray`}
              >
                <p className={`text-default-black text-base font-medium`}>
                  {t("userPanel.myCoursesSection.coursePaymentDate")}
                </p>
                <p className={`text-default-black text-[18px] font-bold`}>
                  {formatDate(courseReceipt?.data[0]?.PeymentDate)}
                </p>
              </div>
              <div
                className={`flex md:flex-row flex-col gap-3 text-center items-center justify-between pb-4 border-b border-light-gray`}
              >
                <p className={`text-default-black text-base font-medium`}>
                  {t("userPanel.myCoursesSection.coursePaymentId")}
                </p>
                <p className={`text-default-black text-[18px] font-bold`}>
                  {courseReceipt?.data[0]?.paymentId}
                </p>
              </div>
            </div>
            <div className={`w-full flex justify-end`}>
              <div
                onClick={() => setIsOpen(false)}
                className={`cursor-pointer px-4 py-2.5 bg-transparent border border-field-silver rounded-[16px] text-field-silver text-base font-normal`}
              >
                {t("userPanel.myCoursesSection.cancel")}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Receipt;
