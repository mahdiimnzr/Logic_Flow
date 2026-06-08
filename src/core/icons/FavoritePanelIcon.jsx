const FavoritePanelIcon = ({
  width = "23",
  height = "20",
  className,
  color = "#848484",
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 23 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M10.8262 2.45982L11.5 3.38393L12.1738 2.45982C13.2969 0.915179 15.1027 0 17.0209 0C20.3227 0 23 2.66071 23 5.94196V6.05804C23 11.067 16.7154 16.8839 13.4361 19.3705C12.8791 19.7902 12.1963 20 11.5 20C10.8037 20 10.1164 19.7946 9.56387 19.3705C6.28457 16.8839 0 11.067 0 6.05804V5.94196C0 2.66071 2.67734 0 5.9791 0C7.89727 0 9.70312 0.915179 10.8262 2.45982Z"
        fill={color}
      />
    </svg>
  );
};

export default FavoritePanelIcon;
