import request from "./axInstance";

export const getCollegeList = async () => {
  return request.get("college");
};
