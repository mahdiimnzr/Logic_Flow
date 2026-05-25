const formatPrice = (value, format = false) => {
  if (value >= 1000000 && format) {
    return (value / 1000000).toFixed(1) + " میلیون";
  } else if (value >= 1000 && format) {
    return (value / 1000).toFixed(0) + " هزار";
  } else {
    return value.toLocaleString("fa-IR");
  }
};

export default formatPrice;
