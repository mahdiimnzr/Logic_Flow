import { useEffect, useContext, useState } from "react";
import { X, Send } from "lucide-react";
import { toast } from "react-toastify";

import ThemeContext from "@/app/context/ThemeContext";
import { useI18n } from "@/i18n/useI18n";
import Button from "@/components/atoms/Buttons/Button";

import {
  createTicketBase,
  getTicketAutoComplete,
} from "@/core/services/api/ticket/ticket.service";

const CreateTicketModal = ({ isOpen, setIsOpen, refetch }) => {
  const { t } = useI18n();
  const { theme } = useContext(ThemeContext);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [problemSuggestions, setProblemSuggestions] = useState([]);
  const [showProblemSuggestions, setShowProblemSuggestions] = useState(false);
  const [describeSuggestions, setDescribeSuggestions] = useState([]);
  const [showDescribeSuggestions, setShowDescribeSuggestions] = useState(false);

  const [formData, setFormData] = useState({
    problem: "",
    describe: "",
    ticketTypeId: null,
    errorId: null,
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isOpen) {
      setFormData({
        problem: "",
        describe: "",
        ticketTypeId: null,
        errorId: null,
      });
      setErrors({});
      setProblemSuggestions([]);
      setShowProblemSuggestions(false);
      setDescribeSuggestions([]);
      setShowDescribeSuggestions(false);
    }
  }, [isOpen]);

  useEffect(() => {
    const words = formData.problem.split(" ");
    const lastWord = words[words.length - 1];

    if (!lastWord.trim()) {
      setProblemSuggestions([]);
      setShowProblemSuggestions(false);
      return;
    }

    const delayDebounceFn = setTimeout(async () => {
      const res = await getTicketAutoComplete(lastWord);
      if (res && res.length > 0) {
        setProblemSuggestions(res);
        setShowProblemSuggestions(true);
      } else {
        setProblemSuggestions([]);
        setShowProblemSuggestions(false);
      }
    }, 400);

    return () => clearTimeout(delayDebounceFn);
  }, [formData.problem]);

  useEffect(() => {
    const words = formData.describe.split(" ");
    const lastWord = words[words.length - 1];

    if (!lastWord.trim()) {
      setDescribeSuggestions([]);
      setShowDescribeSuggestions(false);
      return;
    }

    const delayDebounceFn = setTimeout(async () => {
      const res = await getTicketAutoComplete(lastWord);
      if (res && res.length > 0) {
        setDescribeSuggestions(res);
        setShowDescribeSuggestions(true);
      } else {
        setDescribeSuggestions([]);
        setShowDescribeSuggestions(false);
      }
    }, 400);

    return () => clearTimeout(delayDebounceFn);
  }, [formData.describe]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let formErrors = {};
    if (!formData.problem.trim())
      formErrors.problem = t("userPanel.tickets.yupCreateTicketOne");
    if (!formData.describe.trim())
      formErrors.describe = t("userPanel.tickets.yupCreateTicketTwo");

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setIsSubmitting(true);

    const result = await createTicketBase(formData);

    const isSuccess =
      result &&
      (result.success === true ||
        result.id !== undefined ||
        result.status === 200);

    if (isSuccess) {
      toast.success(result.message || "تیکت شما با موفقیت ثبت شد.");
      if (refetch) refetch();
      setIsOpen(false);
    } else {
      toast.error("خطا در ثبت تیکت. لطفاً دوباره تلاش کنید.");
    }

    setIsSubmitting(false);
  };

  return (
    <div
      className={`${isOpen ? "visible opacity-100" : "invisible opacity-0"} transition-all fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4`}
    >
      <div
        className={`${isOpen ? "mt-0" : "mt-10"} transition-all relative w-full max-w-lg rounded-[24px] p-6 shadow-cards-hover flex flex-col gap-5 ${theme ? "bg-[#1e1e1e]" : "bg-default-light"}`}
      >
        <div className="flex items-center justify-between border-b border-light-gray pb-4">
          <h3 className="text-lg font-bold text-default-black flex items-center gap-2">
            <Send className="size-5 text-green-primary" />
            {t("userPanel.tickets.newTickets")}
          </h3>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="p-1 text-field-silver hover:text-red-500 transition-colors"
          >
            <X className="size-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="relative flex flex-col gap-2">
            <label className="text-[14px] font-semibold text-default-black">
              {t("userPanel.tickets.filters")}
              <span className="text-red-500">*</span>
            </label>

            <input
              type="text"
              value={formData.problem}
              onChange={(e) =>
                setFormData({ ...formData, problem: e.target.value })
              }
              onFocus={() =>
                problemSuggestions.length > 0 && setShowProblemSuggestions(true)
              }
              onBlur={() =>
                setTimeout(() => setShowProblemSuggestions(false), 200)
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                }
              }}
              className={`w-full h-12 rounded-[16px] border ${errors.problem ? "border-red-500" : "border-light-gray"} bg-transparent px-4 text-[14px] text-default-black outline-none transition-colors focus:border-green-primary`}
              placeholder={t("userPanel.tickets.example")}
            />

            {showProblemSuggestions && problemSuggestions.length > 0 && (
              <ul
                className={`absolute top-18.75 right-0 w-full max-h-40 overflow-y-auto rounded-[12px] border shadow-lg z-20 ${theme ? "bg-[#2a2a2a] border-gray-700" : "bg-white border-light-gray"}`}
              >
                {problemSuggestions.map((item) => (
                  <li
                    key={item.id}
                    className={`px-4 py-2.5 cursor-pointer transition-colors text-[13px] ${theme ? "hover:bg-[#333] text-white" : "hover:bg-gray-100 text-default-black"}`}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      const words = formData.problem.split(" ");
                      words[words.length - 1] = item.text;
                      setFormData({
                        ...formData,
                        problem: words.join(" ") + " ",
                      });
                      setShowProblemSuggestions(false);
                    }}
                  >
                    {item.text}
                  </li>
                ))}
              </ul>
            )}
            {errors.problem && (
              <span className="text-red-500 text-[12px]">{errors.problem}</span>
            )}
          </div>

          <div className="relative flex flex-col gap-2">
            <label className="text-[14px] font-semibold text-default-black">
              {t("userPanel.tickets.text")}
              <span className="text-red-500">*</span>
            </label>

            <textarea
              value={formData.describe}
              onChange={(e) =>
                setFormData({ ...formData, describe: e.target.value })
              }
              onFocus={() =>
                describeSuggestions.length > 0 &&
                setShowDescribeSuggestions(true)
              }
              onBlur={() =>
                setTimeout(() => setShowDescribeSuggestions(false), 200)
              }
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                }
              }}
              rows="4"
              className={`w-full rounded-[16px] border ${errors.describe ? "border-red-500" : "border-light-gray"} bg-transparent p-4 text-[14px] text-default-black outline-none transition-colors focus:border-green-primary`}
              placeholder={t("userPanel.tickets.description")}
            />

            {showDescribeSuggestions && describeSuggestions.length > 0 && (
              <ul
                className={`absolute top-20 right-0 w-full max-h-40 overflow-y-auto rounded-[12px] border shadow-lg z-20 ${theme ? "bg-[#2a2a2a] border-gray-700" : "bg-white border-light-gray"}`}
              >
                {describeSuggestions.map((item) => (
                  <li
                    key={item.id}
                    className={`px-4 py-2.5 cursor-pointer transition-colors text-[13px] ${theme ? "hover:bg-[#333] text-white" : "hover:bg-gray-100 text-default-black"}`}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      const words = formData.describe.split(" ");
                      words[words.length - 1] = item.text;
                      setFormData({
                        ...formData,
                        describe: words.join(" ") + " ",
                      });
                      setShowDescribeSuggestions(false);
                    }}
                  >
                    {item.text}
                  </li>
                ))}
              </ul>
            )}
            {errors.describe && (
              <span className="text-red-500 text-[12px]">
                {errors.describe}
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
                ? t("userPanel.tickets.sending")
                : t("userPanel.tickets.sends")}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTicketModal;
