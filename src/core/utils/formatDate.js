const formatDate = (date) => {
  const event = new Date(date);
  const options = {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  };
  return event.toLocaleDateString("fa-IR", options);
};

export default formatDate;
