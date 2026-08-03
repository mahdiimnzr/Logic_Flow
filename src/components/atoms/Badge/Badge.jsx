const Badge = ({ onClick, color, className, children }) => {
  const badgeColors = {
    discountBadge:
      "bg-red-error rounded-[15px] text-default-light font-bold text-base",
    technologyBadge:
      "border border-field-silver text-field-silver rounded-[100px] text-[14px] font-normal",
    articleBadge:
      "border-2 border-green-primary rounded-[100px] text-green-primary text-[14px] font-bold",
    panelAccept:
      "text-green-primary text-base font-normal bg-[#EEFFFC] rounded-[8px]",
    panelDecline:
      "text-red-danger text-base font-normal bg-[#FFECEC] rounded-[8px]",
  };
  return (
    <button onClick={onClick} className={`${badgeColors[color]} ${className}`}>
      {children}
    </button>
  );
};

export default Badge;
