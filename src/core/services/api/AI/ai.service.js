import axios from "axios";

export const getAi = async (messages) => {
  const response = await axios.post(
    "https://hidden-unit-ba14.mahdi7813nazarzadeh-c44.workers.dev",
    {
      messages,
    },
  );

  return response;
};
