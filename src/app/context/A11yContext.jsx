import { createContext, useState, useEffect, useRef, useCallback } from "react";
import { fetchAudioForText } from "../../core/services/api/AI/tts.Service";

export const A11yContext = createContext(null);

export const A11yProvider = ({ children }) => {
  const [isA11yMode, setIsA11yMode] = useState(() => {
    const savedMode = localStorage.getItem("a11yMode");
    return savedMode ? JSON.parse(savedMode) : false;
  });

  const audioRef = useRef(null);
  const isProcessingRef = useRef(false);
  const [readingElement, setReadingElement] = useState(null);

  const toggleA11yMode = () => {
    setIsA11yMode((prev) => {
      const newMode = !prev;
      localStorage.setItem("a11yMode", JSON.stringify(newMode));
      return newMode;
    });
  };

  const playText = useCallback(
    async (text, element) => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
      }
      if (readingElement) readingElement.classList.remove("a11y-reading");

      isProcessingRef.current = true;
      document.body.style.cursor = "wait";

      try {
        const audioUrl = await fetchAudioForText(text);

        if (audioUrl) {
          const audio = new Audio(audioUrl);
          audioRef.current = audio;

          element.classList.add("a11y-reading");
          setReadingElement(element);

          audio.onended = () => {
            element.classList.remove("a11y-reading");
            setReadingElement(null);
          };

          audio.play();
        }
      } catch (error) {
        console.error(error);
      } finally {
        document.body.style.cursor = "default";
        isProcessingRef.current = false;
      }
    },
    [readingElement],
  );

  useEffect(() => {
    if (!isA11yMode) {
      if (audioRef.current) audioRef.current.pause();
      if (readingElement) readingElement.classList.remove("a11y-reading");
      document.body.classList.remove("a11y-active");

      document.querySelectorAll(".a11y-focusable").forEach((el) => {
        el.removeAttribute("tabindex");
        el.classList.remove("a11y-focusable");
      });
      return;
    }

    document.body.classList.add("a11y-active");

    const makeTextsFocusable = () => {
      const elements = document.querySelectorAll(
        "p, h1, h2, h3, h4, h5, h6, li, blockquote, span",
      );
      elements.forEach((el) => {
        if (
          !el.closest("button, a, input, textarea, select") &&
          !el.hasAttribute("tabindex")
        ) {
          el.setAttribute("tabindex", "0");
          el.classList.add("a11y-focusable");
        }
      });
    };

    makeTextsFocusable();

    const observer = new MutationObserver(makeTextsFocusable);
    observer.observe(document.body, { childList: true, subtree: true });

    const handleGlobalClick = (e) => {
      const target = e.target;
      if (target.closest("button, a, input, textarea, select")) return;

      const readableEl = target.closest(".a11y-focusable");
      if (readableEl) {
        const text = readableEl.innerText || readableEl.textContent;
        if (text?.trim()) {
          if (readingElement === readableEl) {
            if (audioRef.current) {
              audioRef.current.pause();
              audioRef.current.src = "";
            }
            readableEl.classList.remove("a11y-reading");
            setReadingElement(null);
          } else if (!isProcessingRef.current) {
            playText(text.trim(), readableEl);
          }
        }
      }
    };

    const handleGlobalKeyDown = (e) => {
      if (e.key !== "Enter" && e.key !== " ") return;

      const target = document.activeElement;
      if (target?.classList.contains("a11y-focusable")) {
        e.preventDefault();
        const text = target.innerText || target.textContent;
        if (text?.trim()) {
          if (readingElement === target) {
            if (audioRef.current) {
              audioRef.current.pause();
              audioRef.current.src = "";
            }
            target.classList.remove("a11y-reading");
            setReadingElement(null);
          } else if (!isProcessingRef.current) {
            playText(text.trim(), target);
          }
        }
      }
    };

    document.addEventListener("click", handleGlobalClick);
    document.addEventListener("keydown", handleGlobalKeyDown);

    return () => {
      observer.disconnect();
      document.removeEventListener("click", handleGlobalClick);
      document.removeEventListener("keydown", handleGlobalKeyDown);
    };
  }, [isA11yMode, readingElement, playText]);

  return (
    <A11yContext.Provider value={{ isA11yMode, toggleA11yMode }}>
      {children}
    </A11yContext.Provider>
  );
};
