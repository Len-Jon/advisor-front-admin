import request from "./axInstance";

export const getUserInfo = (form) => {
  return request.post("login", form);
};
