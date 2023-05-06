import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Alert,
  Spinner,
} from "react-bootstrap";
import InputItem from "../layouts/InputItem";
import { ContextUser } from "../configs/ContextUser";
import { Navigate } from "react-router-dom";
import Apis, { authAPI, endpoints } from "../configs/Apis";
import cookie from "react-cookies";
import { useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import IError from "../layouts/items/iError";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState();
  const [user, dispatch] = useContext(ContextUser);

  const handleLogin = (event) => {
    event.preventDefault();

    const handle = async () => {
      try {
        let res = await Apis.post(endpoints["login"], {
          username: username,
          password: password,
        });
        cookie.save("access-token", res.data.access_token);
        let user = await authAPI().get(endpoints["current-user"]);
        cookie.save("current-user", user.data);
        dispatch({
          type: "login",
          payload: user.data,
        });
      } catch (ex) {
        console.error(ex);
        setErr("Sai Username hoặc Password");
      } finally {
        setLoading(false);
      }
    };

    if (username === "" || password === "")
      setErr("Username và Password không được trống");
    else {
      setLoading(true);
      handle();
    }
  };
  if (user !== null) return <Navigate to="/" />;
  return (
    <>
      <Container fluid className="bg-light py-5 h-100">
        <ToastContainer />
        <Row className="justify-content-center align-items-center h-100">
          <Col xs={12} md={8} lg={6} xl={5}>
            <Card className="shadow-lg border-0 rounded-3">
              <Card.Body className="p-5 text-center">
                <h3 className="mb-5">Đăng nhập</h3>
                {err ? (
                  <>
                    <IError err={err} />
                  </>
                ) : (
                  ""
                )}
                <Form onSubmit={handleLogin}>
                  <InputItem
                    label="Tên đăng nhập"
                    type="text"
                    value={username}
                    setValue={(e) => setUsername(e.target.value)}
                  />
                  <InputItem
                    label="Mật khẩu"
                    type="password"
                    value={password}
                    setValue={(e) => setPassword(e.target.value)}
                  />
                  {loading ? (
                    <Button variant="secondary" size="lg" disabled>
                      <Spinner
                        as="span"
                        animation="grow"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                      />
                      Đăng nhập...
                    </Button>
                  ) : (
                    <Button variant="secondary" size="lg" type="submit">
                      Đăng nhập
                    </Button>
                  )}
                </Form>
                <hr className="my-4" />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Login;
