import cookies from "react-cookies";

const reducerForUser = (state, action) => {
  switch (action.type) {
    case "login":
      return action.payload;
    case "logout":
      cookies.remove("access_token");
      cookies.remove("current-user");
      return null;
    default:
      return state;
  }
};
export default reducerForUser;
