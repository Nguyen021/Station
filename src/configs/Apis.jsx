import axios from "axios";
import cookie from "react-cookies";

export const endpoints = {
  login: "/login/",
  register: "/users/",
  "current-user": "/users/current-user/",
  "list-start-end-point": "/route/list-start-end-points/",
  search: "/search-trip/",
  "trip-detail": (tripId) => `/trip/${tripId}/`,
  "list-comment-trip": (tripId) => `/trip/${tripId}/list-comments/`,
  "create-comment": (tripId) => `/trip/${tripId}/comments/`,
  "list-station": "/list-station/",
  "get-trip-by-station": (stationId) => `/station/${stationId}/trip/`,
  "station-detail": (stationId) => `/station/${stationId}/`,
  "create-booking": `/booking-create/`,
  "rate-station": (stationId) => `/station/${stationId}/rating/`,
  "report-revenue": (stationId) => `/revenue_report/${stationId}`,
  "get-user-detail": (userId) => `/users/${userId}/`,
};

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
