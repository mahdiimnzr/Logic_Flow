import ImageFallback from "@/components/atoms/ImageFallBack/ImageFallBack";
import fallback from "../../../../../public/Profile.png";
import { Check, Plus, Trash2, X } from "lucide-react";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  activeAccount,
  removeAccount,
} from "@/core/services/api/userPanel/userPanel.service";
import { useI18n } from "@/i18n/useI18n";

const MultiAccountsModal = ({
  MultiAccount,
  isOpen,
  setIsOpen,
  setAddAccountOpen,
}) => {
  const { t } = useI18n();
  const queryClient = useQueryClient();

  const { mutate: removeAccountMutate } = useMutation({
    mutationFn: removeAccount,
    onMutate: () => {
      const toastId = toast.loading(t("userPanel.loading"));
      return { toastId };
    },
    onSuccess: (response, _, context) => {
      toast.dismiss(context.toastId);
      toast.success(response.data.message, { id: context.toastId });
      if (response.data.token) {
        localStorage.setItem("token", JSON.stringify(response.data.token));
      }
      queryClient.invalidateQueries({ queryKey: ["MultiAccount"] });
    },
    onError: (response, _, context) => {
      toast.dismiss(context.toastId);
      toast.error(response.data.message, { id: context.toastId });
    },
  });

  const { mutate: activeAccountMutate } = useMutation({
    mutationFn: activeAccount,
    onMutate: () => {
      const toastId = toast.loading(t("userPanel.loading"));
      return { toastId };
    },
    onSuccess: (response, _, context) => {
      toast.dismiss(context.toastId);
      toast.success(response.data.message, { id: context.toastId });
      if (response.data.token) {
        localStorage.setItem("token", JSON.stringify(response.data.token));
      }
      queryClient.invalidateQueries({ queryKey: ["MultiAccount"] });
      queryClient.invalidateQueries({ queryKey: ["UserDetail"] });
      queryClient.invalidateQueries({ queryKey: ["myTickets"] });
      queryClient.invalidateQueries({ queryKey: ["MyReserveCourses"] });
      queryClient.invalidateQueries({ queryKey: ["SecuritySetting"] });
      queryClient.invalidateQueries({ queryKey: ["CoursePaymentsList"] });
      queryClient.invalidateQueries({ queryKey: ["MyCourseCommentsList"] });
      queryClient.invalidateQueries({ queryKey: ["MyArticlesCommentsList"] });
      queryClient.invalidateQueries({ queryKey: ["MyFavoriteNews"] });
      queryClient.invalidateQueries({ queryKey: ["MyFavoriteCourses"] });
      queryClient.invalidateQueries({ queryKey: ["MyNotifications"] });
      queryClient.invalidateQueries({ queryKey: ["MyClasses"] });
      queryClient.invalidateQueries({ queryKey: ["UserHomeWorks"] });
      queryClient.invalidateQueries({ queryKey: ["MyCoursesList"] });
      queryClient.invalidateQueries({ queryKey: ["DashboardArticles"] });
      queryClient.invalidateQueries({ queryKey: ["dashboardMyCourses"] });
      setIsOpen(false);
    },
    onError: (response, _, context) => {
      toast.dismiss(context.toastId);
      toast.error(response.data.message, { id: context.toastId });
    },
  });

  return (
    <div
      className={`size-full fixed transition-all ${
        isOpen ? "visible opacity-100" : "invisible opacity-0"
      } right-0 top-0 z-100 flex items-center justify-center`}
    >
      <div className="size-full absolute top-0 right-0 bg-black/50 backdrop-blur-[2px]"></div>

      <div
        className={`${
          isOpen ? "mt-0" : "mt-10"
        } transition-all sm:p-8 p-4 bg-default-light rounded-[24px] relative xl:w-4/10 sm:w-7/10 w-8/10 max-h-[80vh] flex flex-col`}
      >
        <div
          onClick={() => setIsOpen(false)}
          className="absolute top-6 left-6 cursor-pointer"
        >
          <X className="text-default-black" size={23} />
        </div>

        <div className="flex flex-col gap-5 w-full">
          <div className="flex flex-col items-center w-full">
            <span className="text-default-black sm:text-[18px] text-[15px]">
              {t("userPanel.multiAccounts.title")}
            </span>
            <span className="text-field-silver sm:text-[14px] text-[11px]">
              {t("userPanel.multiAccounts.description")}
            </span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto no-scrollbar py-5">
          <div className="flex flex-col gap-4 w-full">
            {MultiAccount?.accounts?.map((value, index) => {
              const isActive = value.id === MultiAccount.activeId;

              return (
                <div
                  key={index}
                  className={`rounded-[16px] p-4 flex items-center justify-between ${
                    isActive
                      ? "border border-green-primary bg-emerald-400/5 backdrop-blur-md"
                      : "border border-light-gray"
                  }`}
                >
                  <div className="flex items-center sm:gap-6 gap-3">
                    {!isActive && (
                      <div
                        className="size-10 border border-default-light bg-default-light rounded-[12px] flex items-center justify-center cursor-pointer"
                        onClick={() => removeAccountMutate(value.id)}
                      >
                        <Trash2 color="#bf4040" />
                      </div>
                    )}

                    <div className="flex items-center gap-4">
                      <ImageFallback
                        className="sm:size-14 size-10 rounded-full"
                        src={value.currentPictureAddress}
                        fallback={fallback}
                      />

                      <div className="flex flex-col items-start">
                        <span className="text-default-black sm:text-[16px] text-[13px] font-medium">
                          {value.fName}
                        </span>

                        <span className="text-field-silver sm:text-[14px] text-[10px]">
                          {value.lName}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center sm:gap-9 gap-5">
                    <span
                      className={`rounded-[5px] text-[12px] p-1.5 sm:block hidden ${
                        isActive
                          ? "text-green-primary bg-emerald-500/10"
                          : "text-default-black bg-light-gray"
                      }`}
                    >
                      {isActive
                        ? t("userPanel.multiAccounts.currentAccount")
                        : t("userPanel.multiAccounts.otherAccounts")}
                    </span>

                    {isActive ? (
                      <div className="sm:size-7 size-5 rounded-full bg-green-primary flex items-center justify-center">
                        <Check size={18} className="text-white stroke-2" />
                      </div>
                    ) : (
                      <div
                        onClick={() => activeAccountMutate(value.id)}
                        className="sm:size-7 size-5 rounded-full border border-light-gray flex items-center justify-center"
                      ></div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="w-full flex flex-col gap-4 pt-4">
          <div
            className="border border-dashed rounded-[16px] p-6 flex items-center gap-5 cursor-pointer hover:border-field-silver transition-all"
            onClick={() => {
              setIsOpen(false);
              setAddAccountOpen(true);
            }}
          >
            <div className="sm:size-12 size-8 rounded-full bg-emerald-400/10 backdrop-blur-md flex items-center justify-center">
              <Plus color="#008c78" />
            </div>

            <div className="flex flex-col">
              <span className="text-green-primary sm:text-[17px] text-[12px] font-medium">
                {t("userPanel.multiAccounts.addAccount")}
              </span>

              <span className="text-field-silver sm:text-[14px] text-[10px]">
                {t("userPanel.multiAccounts.addAccountDescription")}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MultiAccountsModal;
