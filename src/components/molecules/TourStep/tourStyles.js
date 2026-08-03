export const getTourStyles = (theme, lang) => ({
  popover: (base) => ({
    ...base,
    background: theme ? "#008C78" : "#ffffff",
    color: theme ? "#ffffff" : "#1e293b",
    borderRadius: "16px",
    boxShadow: "0 8px 30px rgba(0,140,120,0.12)",
    border: theme ? "1px solid #ffffff" : "2px solid #008C78",
    padding: "18px 36px 18px 18px",
    maxWidth: "300px",
    fontSize: "13px",
    lineHeight: "1.5",
    direction: lang === "en" ? "ltr" : "rtl",
    textAlign: lang === "en" ? "left" : "right",
  }),
  badge: (base) => ({
    ...base,
    background: theme ? "#ffffff" : "#008C78",
    color: theme ? "#008C78" : "#ffffff",
    borderRadius: "50%",
    padding: "2px 8px",
    fontSize: "11px",
  }),
  dot: (base, { current }) => ({
    ...base,
    background: current
      ? theme
        ? "#ffffff"
        : "#008C78"
      : theme
        ? "rgba(255,255,255,0.4)"
        : "#e2e8f0",
    width: current ? "14px" : "6px",
    height: "6px",
    borderRadius: "999px",
    transition: "all 0.3s",
  }),
  maskArea: (base) => ({ ...base, rx: 10 }),
});
