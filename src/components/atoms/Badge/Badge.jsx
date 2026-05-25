const Badge = ({ onClick, color, className, children }) => {
  const badgeColors = {
    discountBadge:
      "bg-red-error rounded-[15px] text-default-light font-bold text-base",
    technologyBadge:
      "border border-field-silver text-field-silver rounded-[100px] text-[14px] font-normal",
  };
  return (
    <button onClick={onClick} className={`${badgeColors[color]} ${className}`}>
      {children}
    </button>
  );
};

export default Badge;
