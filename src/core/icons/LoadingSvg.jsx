import loading from "/Loading.svg";

const LoadingSvg = ({ className }) => {
  return (
    <img className={`w-6/10 mx-auto h-screen ${className}`} src={loading} />
  );
};

export default LoadingSvg;
