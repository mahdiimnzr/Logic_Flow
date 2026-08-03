import { useEffect, useContext, useState } from "react";
import { X, Star, MessageSquareCheck } from "lucide-react";
import { toast } from "react-toastify";

import ThemeContext from "@/app/context/ThemeContext";
import Button from "@/components/atoms/Buttons/Button";
import { addTicketOverview } from "@/core/services/api/ticket/ticket.service";
import { useI18n } from "@/i18n/useI18n";

const FeedbackTicketModal = ({ isOpen, setIsOpen, ticketId }) => {
  const { theme } = useContext(ThemeContext);
  const { t } = useI18n();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hoverRating, setHoverRating] = useState(0);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    overview: "",
    rate: 5,
    solved: true,
    ticketId: ticketId,
  });

  useEffect(() => {
    if (isOpen) {
      setFormData({ overview: "", rate: 5, solved: true, ticketId: ticketId });
      setErrors({});
      setHoverRating(0);
    }
  }, [isOpen, ticketId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.overview.trim()) {
      setErrors({ overview: t("userPanel.tickets.yupTicketModal") });
      return;
    }

    setIsSubmitting(true);

    const result = await addTicketOverview(formData);

    const isSuccess =
      result && (result.success === true || result.status === 200 || result.id);

    if (isSuccess) {
      toast.success("بازخورد شما با موفقیت ثبت شد. از همراهی شما سپاسگزاریم!");
      setIsOpen(false);
    } else {
      toast.error("خطا در ثبت بازخورد. لطفاً دوباره تلاش کنید.");
    }

    setIsSubmitting(false);
  };

  return (
    <div
      className={`${isOpen ? "visible opacity-100" : "invisible opacity-0"} transition-all fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4`}
    >
      <div
        className={`${isOpen ? "mt-0" : "mt-10"} transition-all relative w-full max-w-md rounded-[24px] p-6 shadow-cards-hover flex flex-col gap-5 ${theme ? "bg-[#1e1e1e]" : "bg-default-light"}`}
      >
        <div className="flex items-center justify-between border-b border-light-gray pb-4">
          <h3 className="text-lg font-bold text-default-black flex items-center gap-2">
            <MessageSquareCheck className="size-5 text-green-primary" />
            {t("userPanel.tickets.FeedbackModal")}
          </h3>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1 text-field-silver hover:text-red-500 transition-colors"
          >
            <X className="size-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col items-center gap-2 mt-2">
            <span className="text-[14px] font-semibold text-default-black">
              {t("userPanel.tickets.score")}
            </span>
            <div className="flex items-center gap-1 flex-row-reverse">
              {[5, 4, 3, 2, 1].map((star) => (
                <Star
                  key={star}
                  className={`size-8 cursor-pointer transition-colors ${
                    star <= (hoverRating || formData.rate)
                      ? "fill-yellow-400 text-yellow-400"
                      : "fill-transparent text-gray-300"
                  }`}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => setFormData({ ...formData, rate: star })}
                />
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-[14px] font-semibold text-default-black">
              {t("userPanel.tickets.question")}
            </span>
            <div className="flex items-center gap-3">
              <label
                className={`flex items-center justify-center gap-2 flex-1 p-3 rounded-[16px] cursor-pointer border transition-colors ${formData.solved ? "border-green-primary bg-green-primary/10 text-green-primary" : "border-light-gray text-field-silver"}`}
              >
                <input
                  type="radio"
                  name="solved"
                  checked={formData.solved === true}
                  onChange={() => setFormData({ ...formData, solved: true })}
                  className="hidden"
                />
                <span className="text-[14px] font-bold">
                  {" "}
                  {t("userPanel.tickets.resolved")}
                </span>
              </label>

              <label
                className={`flex items-center justify-center gap-2 flex-1 p-3 rounded-[16px] cursor-pointer border transition-colors ${!formData.solved ? "border-red-500 bg-red-500/10 text-red-500" : "border-light-gray text-field-silver"}`}
              >
                <input
                  type="radio"
                  name="solved"
                  checked={formData.solved === false}
                  onChange={() => setFormData({ ...formData, solved: false })}
                  className="hidden"
                />
                <span className="text-[14px] font-bold">
                  {" "}
                  {t("userPanel.tickets.notResolved")}
                </span>
              </label>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[14px] font-semibold text-default-black">
              {t("userPanel.tickets.furtherDetails")}
              <span className="text-red-500">*</span>
            </label>
            <textarea
              value={formData.overview}
              onChange={(e) =>
                setFormData({ ...formData, overview: e.target.value })
              }
              rows="3"
              className={`w-full rounded-[16px] border ${errors.overview ? "border-red-500" : "border-light-gray"} bg-transparent p-4 text-[14px] text-default-black outline-none transition-colors focus:border-green-primary`}
              placeholder={t("userPanel.tickets.placeHolderModalOpinion")}
            />
            {errors.overview && (
              <span className="text-red-500 text-[12px]">
                {errors.overview}
              </span>
            )}
          </div>

          <div className="flex items-center justify-end gap-3 mt-2">
            <Button
              type="button"
              onClick={() => setIsOpen(false)}
              color="moreBtn"
              className="px-5 py-2 text-[14px]"
            >
              {t("userPanel.tickets.cancel")}
            </Button>
            <Button
              type="submit"
              color="panelBtn"
              className="px-6 py-2 text-[14px]"
              disabled={isSubmitting}
            >
              {isSubmitting
                ? t("userPanel.tickets.Saving")
                : t("userPanel.tickets.Feedback")}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FeedbackTicketModal;
