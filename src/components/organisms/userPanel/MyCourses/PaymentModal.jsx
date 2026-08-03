import Badge from "@/components/atoms/Badge/Badge";
import Button from "@/components/atoms/Buttons/Button";
import ImageFallback from "@/components/atoms/ImageFallBack/ImageFallBack";
import {
  coursePaymentStep1,
  coursePaymentStep2,
} from "@/core/services/api/userPanel/userPanel.service";
import formatDate from "@/core/utils/formatDate";
import formatPrice from "@/core/utils/formatPrice";
import { useI18n } from "@/i18n/useI18n";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import fallback from "../../../../assets/images/coursePng.png";

const PaymentModal = ({ isOpen, setIsOpen, props }) => {
  const { t } = useI18n();
  const queryClient = useQueryClient();
  const {
    courseImage,
    courseTitle,
    reserveId,
    courseCost,
    courseLastUpdate,
    coursePaymentStatus,
    courseProfessor,
  } = props;
  const [searchParams, setSearchParams] = useSearchParams();

  const initialValue = {
    callbackUrl: "http://localhost:5173/UserPanel/MyCourses",
  };
  const authority = {
    Authority: searchParams.get("Authority"),
  };

  const { mutate: coursePayStep1 } = useMutation({
    mutationFn: (value) =>
      toast.promise(coursePaymentStep1(value), {
        pending: "در حال انتغال به درگاه پرداخت",
        success: {
          render({ data }) {
            return data.data.message;
          },
        },
        error: {
          render({ data }) {
            return data.message;
          },
        },
      }),
    onSuccess: (response) => {
      if (response.data.success) {
        window.open(response.data.link, "_blank", "noopener,noreferrer");
      } else {
        toast.error(response.data.message);
      }
    },
  });
  const { mutate: coursePayStep2 } = useMutation({
    mutationFn: (value) =>
      toast.promise(coursePaymentStep2(value), {
        pending: "در حال تایید پرداخت",
        success: {
          render({ data }) {
            return data.data.message;
          },
        },
        error: {
          render({ data }) {
            return data.message;
          },
        },
      }),
    onSuccess: (response) => {
      if (response.data.success) {
        queryClient.invalidateQueries({ queryKey: ["MyCoursesList"] });
        setSearchParams({});
        setIsOpen(false);
      } else {
        toast.error(response.data.message);
      }
    },
  });
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
        <div className={`flex flex-col gap-5 w-full`}>
          <ImageFallback
            src={courseImage}
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
              {courseTitle}
            </p>
          </div>
          <div
            className={`flex md:flex-row flex-col gap-3 text-center items-center justify-between pb-4 border-b border-light-gray`}
          >
            <p className={`text-default-black text-base font-medium`}>
              {t("userPanel.myCoursesSection.courseTeacher")}
            </p>
            <p className={`text-default-black text-[18px] font-bold`}>
              {courseProfessor}
            </p>
          </div>
          <div
            className={`flex md:flex-row flex-col gap-3 text-center items-center justify-between pb-4 border-b border-light-gray`}
          >
            <p className={`text-default-black text-base font-medium`}>
              {t("userPanel.myCoursesSection.coursePrice")}
            </p>
            <p className={`text-default-black text-[18px] font-bold`}>
              {formatPrice(courseCost)} {t("userPanel.myCoursesSection.toman")}
            </p>
          </div>
          <div
            className={`flex md:flex-row flex-col gap-3 text-center items-center justify-between pb-4 border-b border-light-gray`}
          >
            <p className={`text-default-black text-base font-medium`}>
              {t("userPanel.myCoursesSection.courseLastUpdate")}
            </p>
            <p className={`text-default-black text-[18px] font-bold`}>
              {formatDate(courseLastUpdate)}
            </p>
          </div>
          <div
            className={`flex md:flex-row flex-col gap-3 text-center items-center justify-between pb-4 border-b border-light-gray`}
          >
            <p className={`text-default-black text-base font-medium`}>
              {t("userPanel.myCoursesSection.coursePaymentStatus")}
            </p>
            <Badge
              color={
                coursePaymentStatus === "پرداخت نشده"
                  ? "panelDecline"
                  : "panelAccept"
              }
              className={`px-3 py-0.5 xl:text-base! text-[14px] w-fit!`}
            >
              {coursePaymentStatus === "پرداخت نشده"
                ? t("userPanel.myCoursesSection.unPaid")
                : t("userPanel.myCoursesSection.paid")}
            </Badge>
          </div>
        </div>
        <div className={`w-full flex justify-between`}>
          <Button
            onClick={() => {
              if (!searchParams.get("Authority")) {
                coursePayStep1({ reserveId, initialValue });
              }
              if (searchParams.get("Authority")) {
                coursePayStep2({ reserveId, authority });
              }
            }}
            color={"panelBtn"}
            className={`sm:px-4 px-3 sm:py-2.5 py-1.5 sm:text-base! text-[14px]!`}
          >
            {!searchParams.get("Authority")
              ? t("userPanel.myCoursesSection.payCourse")
              : t("userPanel.myCoursesSection.acceptPayCourse")}
          </Button>
          <div
            onClick={() => setIsOpen(false)}
            className={`cursor-pointer px-4 py-2.5 bg-transparent border border-field-silver rounded-[16px] text-field-silver text-base font-normal`}
          >
            {t("userPanel.myCoursesSection.cancel")}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
