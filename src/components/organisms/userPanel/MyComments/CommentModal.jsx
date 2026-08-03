import Badge from "@/components/atoms/Badge/Badge";
import formatDate from "@/core/utils/formatDate";
import { useI18n } from "@/i18n/useI18n";
import { EyeIcon } from "lucide-react";
import { Link } from "react-router-dom";

const CommentModal = ({ isOpen, setIsOpen, props }) => {
  const { t } = useI18n();

  const { title, describe, insertDate, accept, isNews, id } = props;
  return (
    <div
      className={`size-full fixed transition-all ${isOpen ? "visible opacity-100" : "invisible opacity-0"} right-0 top-0 z-100 flex items-center justify-center`}
    >
      <div
        className={`size-full absolute top-0 right-0 bg-black/50 backdrop-blur-[2px]`}
      ></div>
      <div
        className={`${isOpen ? "mt-0" : "mt-10"} transition-all sm:p-8 p-4 bg-default-light rounded-[24px] relative xl:w-4/10 sm:w-7/10 w-8/10 max-h-[calc(100vh-64px)] overflow-y-auto no-scrollbar flex flex-col gap-8`}
      >
        <div
          className={`flex flex-col gap-8 bg-default-light p-3 rounded-2xl border border-light-gray`}
        >
          <div className={`flex flex-col gap-6`}>
            <div className={`flex flex-col gap-3`}>
              <p
                className={`text-field-silver md:text-[14px] text-[12px] font-normal`}
              >
                {formatDate(insertDate)}
              </p>
              <div>
                <span
                  className={`md:text-[14px] text-[12px] text-default-black font-normal`}
                >
                  {title}
                </span>
                <p
                  className={`md:text-[14px] text-[12px] text-field-silver leading-loose font-normal`}
                >
                  {describe}
                </p>
              </div>
              <div className="flex items-center gap-2 w-fit">
                <Badge
                  color={
                    isNews
                      ? "panelAccept"
                      : accept
                        ? "panelAccept"
                        : "panelDecline"
                  }
                  className={`px-3 py-0.5 xl:text-base! text-[14px]`}
                >
                  {isNews
                    ? t("userPanel.myPaymentsSection.confirmed")
                    : accept
                      ? t("userPanel.myPaymentsSection.confirmed")
                      : t("userPanel.myPaymentsSection.notConfirmed")}
                </Badge>
                <Link
                  to={
                    isNews
                      ? `/Articles/Detail/${id}/Review`
                      : `/Courses/Detail/${id}/Review`
                  }
                >
                  <EyeIcon className="xl:size-5 size-4" color="#008C78" />
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div
          onClick={() => setIsOpen(false)}
          className={`cursor-pointer px-4 py-2.5 bg-transparent border border-field-silver rounded-[16px] text-field-silver text-base font-normal self-start`}
        >
          {t("userPanel.myCoursesSection.cancel")}
        </div>
      </div>
    </div>
  );
};

export default CommentModal;
