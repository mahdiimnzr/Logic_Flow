import { useContext, useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import {
  ArrowRight,
  Send,
  CheckCircle,
  Headset,
  User,
  Star,
} from "lucide-react";
import ThemeContext from "@/app/context/ThemeContext";
import { useI18n } from "@/i18n/useI18n";
import Button from "@/components/atoms/Buttons/Button";
import Badge from "@/components/atoms/Badge/Badge";
import LoadingSvg from "@/core/icons/LoadingSvg";

import {
  getTicketDetailUser,
  sendTicketMessageUser,
  closeTicketUser,
  getTicketAutoComplete,
} from "@/core/services/api/ticket/ticket.service";
import FeedbackTicketModal from "./FeedbackTicketModal";
import formatDate from "@/core/utils/formatDate";

const TicketDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t, lang } = useI18n();
  const { theme } = useContext(ThemeContext);

  const [newMessage, setNewMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);

  const chatEndRef = useRef(null);

  const {
    data: ticketDetail,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["ticketDetail", id],
    queryFn: () => getTicketDetailUser(id),
    enabled: !!id,
  });

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [ticketDetail]);

  useEffect(() => {
    const words = newMessage.split(" ");
    const lastWord = words[words.length - 1];

    if (!lastWord.trim()) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    const delayDebounceFn = setTimeout(async () => {
      const res = await getTicketAutoComplete(lastWord);
      if (res && res.length > 0) {
        setSuggestions(res);
        setShowSuggestions(true);
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    }, 400);

    return () => clearTimeout(delayDebounceFn);
  }, [newMessage]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    setIsSending(true);
    const result = await sendTicketMessageUser({
      text: newMessage,
      ticketId: id,
    });

    if (result && result.success) {
      setNewMessage("");
      setSuggestions([]);
      refetch();
    } else {
      toast.error("خطا در ارسال پیام");
    }
    setIsSending(false);
  };

  const handleCloseTicket = async () => {
    setIsClosing(true);
    const result = await closeTicketUser(id);

    if (result && result.success) {
      toast.success(result.message || "تیکت با موفقیت بسته شد");
      refetch();
    } else {
      toast.error("خطا در بستن تیکت");
    }
    setIsClosing(false);
  };

  if (isLoading) return <LoadingSvg className="h-full!" />;
  if (!ticketDetail)
    return <div className="text-center py-10">تیکتی یافت نشد.</div>;

  const isClosed = ticketDetail.isDone;

  return (
    <div
      className={`flex flex-col h-[calc(100vh-120px)] sm:h-[calc(100vh-140px)] bg-default-light border border-light-gray rounded-[24px] overflow-hidden shadow-sm`}
    >
      <div
        className={`flex items-center justify-between p-4 sm:px-6 border-b border-light-gray ${theme ? "bg-[#252525]" : "bg-white"}`}
      >
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/UserPanel/MyTickets")}
            className="p-2 bg-light-gray rounded-full hover:bg-muted transition-colors"
          >
            <ArrowRight
              className={`size-5 text-default-black ${lang === "en" ? "rotate-180" : ""}`}
            />
          </button>
          <div className="flex flex-col">
            <h2 className="text-base sm:text-lg font-bold text-default-black truncate max-w-50 sm:max-w-md">
              {ticketDetail.problem}
            </h2>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-[12px] text-field-silver font-normal">
                {t("userPanel.tickets.menu2")}:
                {ticketDetail.ticketTypeId || t("userPanel.tickets.department")}
              </span>
              <span className="text-[10px] text-field-silver">•</span>
              {isClosed ? (
                <Badge className="px-2 py-0 text-[11px] bg-light-gray text-field-silver rounded-full">
                  {t("userPanel.tickets.closed")}
                </Badge>
              ) : (
                <Badge color="panelDecline" className="px-2 py-0 text-[11px]">
                  {t("userPanel.tickets.underReview")}
                </Badge>
              )}
            </div>
          </div>
        </div>

        {!isClosed ? (
          <Button
            onClick={handleCloseTicket}
            color="moreBtn"
            className="flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2"
            disabled={isClosing}
          >
            <CheckCircle className="size-4" />
            <span className="hidden sm:block text-[13px]">
              {t("userPanel.tickets.closeTicket")}
            </span>
          </Button>
        ) : (
          <Button
            onClick={() => setIsFeedbackModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-[12px] transition-colors"
          >
            <Star className="size-4 fill-white" />
            <span className="hidden sm:block text-[13px]">
              {t("userPanel.tickets.Feedback")}
            </span>
          </Button>
        )}
      </div>

      <div
        className={`flex-1 overflow-y-auto p-4 sm:p-6 flex flex-col gap-4 ${theme ? "bg-[#1e1e1e]" : "bg-[#f8f9fa]"}`}
      >
        <div className="flex w-full justify-start">
          <div className={`flex flex-col max-w-[85%] sm:max-w-[70%]`}>
            <div className="flex items-center justify-start gap-2 mb-1">
              <User className="size-3.5 text-field-silver" />
              <span className="text-[12px] text-field-silver">
                {t("userPanel.tickets.you")}
              </span>
            </div>
            <div
              className={`p-3 sm:p-4 rounded-[16px] rounded-tr-sm bg-green-primary text-white shadow-sm`}
            >
              <p className="text-[14px] leading-7 font-normal whitespace-pre-wrap text-right">
                {ticketDetail.describe}
              </p>
            </div>
            <span className="text-[10px] text-field-silver mt-1 text-right px-1">
              {ticketDetail.insetDate ? formatDate(ticketDetail.insetDate) : ""}
            </span>
          </div>
        </div>

        {ticketDetail.ticketMessages &&
          ticketDetail.ticketMessages.map((msg) => {
            const isSupporter = msg.isSupport === true;
            return (
              <div
                key={msg.id}
                className={`flex w-full ${isSupporter ? "justify-end" : "justify-start"}`}
              >
                <div className={`flex flex-col max-w-[85%] sm:max-w-[70%]`}>
                  <div
                    className={`flex items-center gap-2 mb-1 ${isSupporter ? "justify-end" : "justify-start"}`}
                  >
                    {isSupporter ? (
                      <>
                        <span className="text-[12px] text-field-silver">
                          {t("userPanel.tickets.Support")}
                        </span>
                        <Headset className="size-3.5 text-green-primary" />
                      </>
                    ) : (
                      <>
                        <User className="size-3.5 text-field-silver" />
                        <span className="text-[12px] text-field-silver">
                          {t("userPanel.tickets.you")}
                        </span>
                      </>
                    )}
                  </div>

                  <div
                    className={`p-3 sm:p-4 shadow-sm text-right ${
                      isSupporter
                        ? `rounded-[16px] rounded-tl-sm ${theme ? "bg-[#2a2a2a] text-white" : "bg-white text-default-black border border-light-gray"}`
                        : `rounded-[16px] rounded-tr-sm bg-green-primary text-white`
                    }`}
                  >
                    <p className="text-[14px] leading-7 font-normal whitespace-pre-wrap">
                      {msg.text || msg.message}
                    </p>
                  </div>

                  <span
                    className={`text-[10px] text-field-silver mt-1 px-1 ${isSupporter ? "text-left" : "text-right"}`}
                  >
                    {msg.insertDate ? formatDate(msg.insertDate) : ""}
                  </span>
                </div>
              </div>
            );
          })}

        <div ref={chatEndRef} />
      </div>

      <div
        className={`p-4 border-t border-light-gray ${theme ? "bg-[#252525]" : "bg-white"}`}
      >
        {isClosed ? (
          <div className="flex items-center justify-center h-12 bg-light-gray rounded-[16px] text-field-silver md:text-[14px] text-[10px]">
            {t("userPanel.tickets.ticketDetailsClosed")}
          </div>
        ) : (
          <form
            onSubmit={handleSendMessage}
            className="relative flex items-center gap-3"
          >
            {showSuggestions && suggestions.length > 0 && (
              <ul
                className={`absolute bottom-15 right-0 w-full max-w-sm max-h-40 overflow-y-auto rounded-[16px] border shadow-lg z-10 ${theme ? "bg-[#2a2a2a] border-gray-700" : "bg-white border-light-gray"}`}
              >
                {suggestions.map((item) => (
                  <li
                    key={item.id}
                    className={`px-4 py-2.5 cursor-pointer transition-colors text-[13px] ${theme ? "hover:bg-[#333] text-white" : "hover:bg-gray-100 text-default-black"}`}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      const words = newMessage.split(" ");
                      words[words.length - 1] = item.text;
                      setNewMessage(words.join(" ") + " ");
                      setShowSuggestions(false);
                    }}
                  >
                    {item.text}
                  </li>
                ))}
              </ul>
            )}

            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
              placeholder={t("userPanel.tickets.placeHolderModal")}
              className={`flex-1 h-12 rounded-[16px] px-4 text-[14px] outline-none border border-light-gray focus:border-green-primary transition-colors ${theme ? "bg-[#1e1e1e] text-white" : "bg-default-light text-default-black"}`}
              disabled={isSending}
            />
            <Button
              type="submit"
              color="panelBtn"
              className="h-12 w-12 sm:w-auto flex items-center justify-center gap-2 px-0 sm:px-6 rounded-[16px]"
              disabled={isSending || !newMessage.trim()}
            >
              <Send
                className={`size-5 ${lang === "en" ? "" : "-scale-x-100"}`}
              />
              <span className="hidden sm:block font-bold">
                {t("userPanel.tickets.send")}
              </span>
            </Button>
          </form>
        )}
      </div>

      <FeedbackTicketModal
        isOpen={isFeedbackModalOpen}
        setIsOpen={setIsFeedbackModalOpen}
        ticketId={id}
      />
    </div>
  );
};

export default TicketDetail;
