import noInternetSvg from "/NoInternet.svg";

export default function NoInternetIcon({ className = "h-full" }) {
  return <img src={noInternetSvg} alt="قطعی اینترنت" className={className} />;
}
