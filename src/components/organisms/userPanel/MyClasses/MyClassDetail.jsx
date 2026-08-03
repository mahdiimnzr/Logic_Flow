import LoadingSvg from "@/core/icons/LoadingSvg";
import { useGetSessionDetail } from "@/core/services/api/userPanel/userPanel.service";
import { useI18n } from "@/i18n/useI18n";
import { Link } from "react-router-dom";

const MyClassDetail = ({ isOpen, setIsOpen, props }) => {
  const { t } = useI18n();
  const { isLoading, data } = useGetSessionDetail(props.SessionId);
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
          <div className={`flex flex-col gap-5 w-full`}>
            <div
              className={`flex flex-col gap-3 justify-between pb-4 border-b border-light-gray`}
            >
              <p className={`text-default-black text-base font-medium`}>
                {t("userPanel.myClass.title")}
              </p>
              <p className={`text-default-black text-[18px] font-bold`}>
                {data?.data?.sessionTitle}
              </p>
            </div>
            <div className={`flex flex-col gap-3 justify-between pb-4`}>
              <p className={`text-default-black text-base font-medium`}>
                {t("userPanel.myClass.file")}
              </p>
              {(data?.data?.sessionFileDtos ?? []).length > 0 ? (
                (data?.data?.sessionFileDtos ?? [])?.map((value, index) => (
                  <div
                    className={`text-default-black text-[18px] font-bold flex items-center gap-2`}
                  >
                    <p>{t("userPanel.myClass.fileName") + " " + index + 1}: </p>
                    <Link
                      target="blank"
                      to={value.fileAddress}
                      className="text-green-primary"
                    >
                      {value.fileName}
                    </Link>
                  </div>
                ))
              ) : (
                <span
                  className={`text-[14px] font-semibold text-default-black text-center`}
                >
                  {t("userPanel.dashboardSection.notFound")}
                </span>
              )}
            </div>
          </div>
        )}
        <div className={`w-full flex justify-between`}>
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

export default MyClassDetail;
