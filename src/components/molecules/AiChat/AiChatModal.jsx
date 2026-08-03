import { getAi } from "@/core/services/api/AI/ai.service";
import {
  useGetCourseComments,
  useGetCourseDetail,
} from "@/core/services/api/CourseDetails/CourseDetails.service";
import { useI18n } from "@/i18n/useI18n";
import { useMutation } from "@tanstack/react-query";
import EmojiPicker from "emoji-picker-react";
import { Bot, SendHorizontal, Smile, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const AiChatModal = ({ onClose, isOpen }) => {
  const { t, lang } = useI18n();
  const { id } = useParams();
  const { pathname } = useLocation();
  const chatRef = useRef(null);

  const [message, setMessage] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);
  const [isAnswering, setIsAnswering] = useState(false);
  const [allMessages, setAllMessages] = useState([
    {
      role: "assistant",
      content: t("ai.assistantGreeting"),
    },
  ]);

  const onEmojiClick = (emojiData) => {
    setMessage((prev) => prev + emojiData.emoji);
    setShowEmoji(false);
  };

  const { data: Details } = useGetCourseDetail(id, { enabled: !!id });
  const { data: CourseComments } = useGetCourseComments(id, { enabled: !!id });

  const { mutate } = useMutation({
    mutationFn: getAi,
    onMutate: () => {
      setIsAnswering(true);
    },
    onSuccess: (response) => {
      setIsAnswering(false);
      setAllMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: response.data.choices[0].message.content,
        },
      ]);
    },

    onError: () => {
      setIsAnswering(false);
      toast.error(t("ai.errorMessage"));
    },
  });

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTo({
        top: chatRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [allMessages, isAnswering]);

  return (
    <div
      className={`fixed inset-0 z-999 transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
    >
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-black/25 backdrop-blur-[3px] transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0"}`}
      />
      <div
        className={`absolute bottom-4 ${lang === "en" ? "left-1/2 sm:left-6" : "sm:right-6 right-1/2"} translate-x-1/2  sm:bottom-28 sm:translate-x-0 w-9/10 sm:w-97.5 h-[85vh] sm:h-155 rounded-3xl border border-light-gray  bg-default-light shadow-2xl overflow-hidden flex flex-col transition-all duration-300 ease-out  ${isOpen ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-12"}`}
      >
        <div
          className={`bg-green-primary px-4 sm:px-5 py-4 flex items-center justify-between`}
        >
          <div className={`flex items-center gap-3`}>
            <div
              className={`size-10 sm:size-12 rounded-full bg-default-light flex items-center justify-center`}
            >
              <Bot size={22} className={`text-green-primary`} />
            </div>
            <div>
              <h2
                className={`font-bold text-sm sm:text-base text-default-light`}
              >
                {t("ai.aiAssistant")}
              </h2>
              <div className={`flex items-center gap-2 mt-1`}>
                <span
                  className={`size-2 rounded-full bg-lightly-green animate-pulse`}
                />
                <span className={`text-xs sm:text-sm text-default-light`}>
                  {t("ai.online")}
                </span>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className={`size-10 rounded-full hover:bg-default-light/20 transition flex items-center justify-center`}
          >
            <X className={`text-default-light`} />
          </button>
        </div>

        <div
          ref={chatRef}
          className={`flex-1 overflow-y-auto p-5 flex flex-col gap-5`}
        >
          <div className={`flex flex-col items-center text-center gap-3`}>
            <div
              className={`size-16 rounded-full bg-green-primary/10 flex items-center justify-center`}
            >
              <Bot className={`text-green-primary`} size={32} />
            </div>
            <h3 className={`font-bold text-lg text-default-black`}>
              {t("ai.welcomeTitle")}
            </h3>
            <p className={`text-sm leading-7 text-field-silver`}>
              {t("ai.welcomeDescription1")}
              <br />
              {t("ai.welcomeDescription2")}
            </p>
          </div>

          {(allMessages ?? [])?.map((value, index) =>
            value.role === "assistant" ? (
              <div key={index + "bot"} className={`flex justify-end gap-3`}>
                <div
                  className={`max-w-[85%] sm:max-w-[75%] rounded-2xl rounded-tl-md bg-emerald-400/5 border border-green-primary/10 px-4 py-3 shadow-sm`}
                >
                  <p className={`text-sm leading-7 text-default-black`}>
                    {value.content}
                  </p>
                </div>
                <div
                  className={`size-9 sm:size-10 rounded-full bg-green-primary flex items-center justify-center shrink-0`}
                >
                  <Bot size={18} className="text-default-light" />
                </div>
              </div>
            ) : (
              <div key={index + "user"} className={`flex justify-start`}>
                <div
                  className={`max-w-[85%] sm:max-w-[75%] rounded-2xl rounded-tr-md bg-green-primary px-4 py-3 shadow`}
                >
                  <p className={`text-sm leading-7 text-default-light`}>
                    {value.content}
                  </p>
                </div>
              </div>
            ),
          )}

          {isAnswering && (
            <div className={`flex justify-end gap-3`}>
              <div
                className={`rounded-2xl rounded-tl-md bg-emerald-400/5 border border-green-primary/10 px-5 py-4 flex items-center gap-1`}
              >
                <span
                  className={`size-2 rounded-full bg-green-primary animate-bounce`}
                />
                <span
                  className={`size-2 rounded-full bg-green-primary animate-bounce`}
                  style={{ animationDelay: ".2s" }}
                />
                <span
                  className={`size-2 rounded-full bg-green-primary animate-bounce`}
                  style={{ animationDelay: ".4s" }}
                />
              </div>
              <div
                className={`size-9 sm:size-10 rounded-full bg-green-primary flex items-center justify-center shrink-0`}
              >
                <Bot size={18} className={`text-default-light `} />
              </div>
            </div>
          )}
        </div>

        <div
          className={`relative border-t border-light-gray bg-default-light p-3`}
        >
          {showEmoji && (
            <div
              className={`absolute bottom-24 left-1/2 -translate-x-1/2 sm:left-auto sm:right-4 sm:translate-x-0 z-50 rounded-2xl overflow-hidden border border-light-gray shadow-[0_15px_40px_rgba(0,0,0,.18)]`}
            >
              <EmojiPicker
                onEmojiClick={onEmojiClick}
                theme="light"
                width={320}
                height={360}
              />
            </div>
          )}
          <form
            onSubmit={(event) => {
              event.preventDefault();
              if (!message.trim() == "" && !isAnswering) {
                setAllMessages([
                  ...allMessages,
                  {
                    role: "user",
                    content: message.trim(),
                  },
                ]);
                mutate([
                  ...allMessages,
                  {
                    role: "user",
                    content:
                      pathname.includes("/Courses/Detail") &&
                      Details?.data &&
                      CourseComments?.data
                        ? `اطلاعات ${JSON.stringify(Details?.data ?? "[]")} کامنت ها ${JSON.stringify(CourseComments?.data ?? "[]")} ${message.trim()}`
                        : message.trim(),
                  },
                ]);
              }
              setMessage("");
            }}
            className={`rounded-3xl border border-light-gray bg-default-light shadow-sm transition-all duration-300`}
          >
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              type="text"
              placeholder={t("ai.inputPlaceholder")}
              className={`w-full bg-transparent outline-none px-5 pt-4 text-[15px] text-default-black placeholder:text-field-silver`}
            />
            <div className={`flex items-center justify-between px-3 py-2`}>
              <div className={`flex items-center gap-2`}>
                <button
                  type="button"
                  onClick={() => setShowEmoji((prev) => !prev)}
                  className={`size-10 rounded-full hover:bg-green-primary/10 hover:text-green-primary transition-all flex items-center justify-center text-field-silver`}
                >
                  <Smile size={20} />
                </button>
              </div>
              <button
                type="submit"
                className={`size-11 rounded-full bg-green-primary transition-all duration-300 shadow-lg flex items-center justify-center ${message.trim() == "" ? "cursor-not-allowed" : "cursor-pointer"}`}
              >
                <SendHorizontal size={18} className={`text-default-light`} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AiChatModal;
