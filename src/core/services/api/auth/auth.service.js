import postParams from "../../common/postParams";

export const postLogin = (params) => postParams(`Sign/Login`, params);
export const verifyCodeLogin = (params) =>
  postParams(`/Sign/LoginTelegram/${params.verifyCode}/${params.phoneOrGmail}`);
export const sendVerifyRegister = (params) =>
  postParams(`Sign/SendVerifyMessage`, params);
export const verifyMessageRegister = (params) =>
  postParams(`Sign/VerifyMessage`, params);
export const completeRegister = (params) => postParams(`Sign/Register`, params);
