import React, { useContext, useState } from "react";
import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBBtn,
  MDBIcon,
  MDBInput,
  MDBCheckbox,
} from "mdb-react-ui-kit";
import Apis, { authAPI, endpoints } from "../configs/Apis";
import cookie, { load } from "react-cookies";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Navigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

function Signin() {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);
  const [user, dispatch] = useContext(UserContext);

  const getToken = async () => {
    let response = await Apis.post(endpoints["login"], {
      username: username,
      password: password,
      client_id: "6BQTBv2ItokdVwqqsOX5XhP4g03X5uNMJyjfKkNg",
      client_secret:
        "qC0IwGTqHTJObUqLVQ8wtVA0Pd9yX6v0V5Bt6KorOixsmSyHH46Mw6TYHIYGVUEJ6B3Z8oqJD6r8Mt8JE3GnSdYpcAz5klrxRcgiaRZ9mOfOhQCO1T3Bc9B5d0KB2W7V",
      grant_type: "password",
    });
    cookie.save("access-token", response.data.access_token);

    //get user after authentication ahead
    let user = await authAPI().get(endpoints["current-user"]);
    cookie.save("current-user", user.data);
    console.log(user.data);
    dispatch({
      type: "login",
      payload: user.data,
    });
    setLoading(false);
    return user;
  };

  const Login = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      const token = await getToken();
      if (token) {
        toast.success("Đăng nhập thành công");
      }
    } catch (error) {
      toast.error("Đăng nhập thất bại");
    } finally {
      setLoading(false);
    }
  };

  if (user !== null) return <Navigate to="/" />;
  return (
    <form onSubmit={Login}>
      <ToastContainer />
      <MDBContainer fluid className="p-3 my-5">
        <MDBRow>
          <MDBCol col="10" md="6">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
              class="img-fluid"
              alt="Phone image"
            />
          </MDBCol>

          <MDBCol col="3" md="5">
            <MDBInput
              wrapperClass="mb-4"
              label="Username"
              id="formControlLg"
              type="text"
              size="lg"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
            <MDBInput
              wrapperClass="mb-4"
              label="Password"
              id="formControlLg"
              type="password"
              size="lg"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />

            <div className="d-flex justify-content-between mx-4 mb-4">
              <MDBCheckbox
                name="flexCheck"
                value=""
                id="flexCheckDefault"
                label="Remember me"
              />
              <a href="!#">Forgot password?</a>
            </div>

            <MDBBtn disabled={loading} className="mb-4 w-100" size="lg">
              Login
            </MDBBtn>

            <div className="divider d-flex align-items-center my-4">
              <p className="text-center fw-bold mx-3 mb-0">OR</p>
            </div>

            <MDBBtn
              className="mb-4 w-100"
              size="lg"
              style={{ backgroundColor: "#3b5998" }}
            >
              <MDBIcon fab icon="facebook-f" className="mx-2" />
              Continue with facebook
            </MDBBtn>

            <MDBBtn
              className="mb-4 w-100"
              size="lg"
              style={{ backgroundColor: "#55acee" }}
            >
              <MDBIcon fab icon="google" className="mx-2" />
              Continue with google
            </MDBBtn>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </form>
  );
}

export default Signin;
