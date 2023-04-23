import axios from "axios";
import cookie from "react-cookies";

export let endpoints = {
  "oauth2-info": "/oauth2-info/",
  login: "/o/token/",
  "current-user": "/users/current-user/",
  register: "/users/",
};

//instance another axios has authentication
export const authAPI = () =>
  axios.create({
    baseURL: "http://127.0.0.1:8000/",
    headers: {
      Authorization: `Bearer ${cookie.load("access-token")}`,
    },
  });

export default axios.create({
  baseURL: "http://127.0.0.1:8000/",
});
