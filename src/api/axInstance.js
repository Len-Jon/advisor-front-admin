import axios from "axios";

const request = axios.create({
  baseURL: "api/",
  timeout: 5000,
});

request.interceptors.response.use(
  (res) => {
    console.log(res.data)
    return res.data;
  },
  (error) => {
    // resolve一个data对象，否则await得不到预期的data
    return Promise.resolve({ code: 500, error });
  }
);

export default request;
