import { useState, useEffect } from "react";

const BACKEND_URL = "http://162.19.253.202:3001";

const ImageFallback = ({ src, fallback = "/images/fallback.png", ...rest }) => {
  const [imgSrc, setImgSrc] = useState(fallback);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (!src || src.trim() === "") {
      setImgSrc(fallback);
      setHasError(false);
      return;
    }

    let finalSrc = src;
    if (src.startsWith(BACKEND_URL)) {
      finalSrc = src.replace(BACKEND_URL, "");
    }

    setImgSrc(finalSrc);
    setHasError(false);
  }, [src, fallback]);

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      setImgSrc(fallback);
    }
  };

  return <img src={imgSrc} onError={handleError} {...rest} />;
};

export default ImageFallback;
