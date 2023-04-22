import axios from "axios";
import cookie from "react-cookies";

export const endpoints = {
  login: "/o/token/",
  "current-user": "/users/current-user/",
  register: "/users/",
};

export const authAPI = () =>
  axios.create({
    baseURL: "",
    headers: {
      Authorization: `Bearer ${cookie.load("access-token")}`,
    },
  });

export default axios.create({
  baseURL: "http://127.0.0.1:8000/",
});
