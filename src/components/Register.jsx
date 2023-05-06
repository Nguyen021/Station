import { useRef, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import Apis, { endpoints } from "../configs/Apis";
import { useNavigate } from "react-router-dom";
import IError from "../layouts/items/iError";

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
  });

  const avatar = useRef();

  const navigate = useNavigate();
  const register = (event) => {
    event.preventDefault();

    let registerUser = async () => {
      try {
        const formData = new FormData();
        formData.append("first_name", user.firstName);
        formData.append("last_name", user.lastName);
        formData.append("email", user.email);
        formData.append("username", user.username);
        formData.append("password", user.password);
        if (avatar.current.files.length > 0)
          formData.append("avatar", avatar.current.files[0]);
        let res = await Apis.post(endpoints["register"], formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        toast.success("Đăng ký thành công", {
          onOpen: () => {
            setTimeout(() => {
              navigate("/login");
            }, 2000);
          },
        });
      } catch (ex) {
        let message = "";
        for (let e of Object.values(ex.response.data)) message += `${e} `;
        setErr(message);
        toast.error(message);
      } finally {
        setLoading(false);
      }
    };
    if (user.password !== null && user.password === user.confirmPassword) {
      registerUser();
    }
  };

  const setValueUser = (event) => {
    const { name, value } = event.target;
    setUser((current) => ({ ...current, [name]: value }));
  };
  return (
    <>
      <Container style={{ marginTop: "30px" }}>
        <ToastContainer />
        {err ? <IError err={err} /> : ""}
        <Form onSubmit={register}>
          <RegisterForm
            id="firstName"
            lable="First Name"
            name="firstName"
            type="text"
            value={user.firstName}
            change={setValueUser}
          />
          <RegisterForm
            id="lastName"
            lable="Last Name"
            name="lastName"
            type="text"
            value={user.lastName}
            change={setValueUser}
          />
          <RegisterForm
            id="email"
            lable="Email"
            name="email"
            type="email"
            value={user.email}
            change={setValueUser}
          />
          <RegisterForm
            id="username"
            lable="Username"
            name="username"
            type="text"
            value={user.username}
            change={setValueUser}
          />
          <RegisterForm
            id="password"
            lable="Password"
            name="password"
            type="password"
            value={user.password}
            change={setValueUser}
          />
          <RegisterForm
            id="confirmPassword"
            lable="Confirm Password"
            type="password"
            name="confirmPassword"
            value={user.confirmPassword}
            change={setValueUser}
          />

          <Form.Group
            style={{ width: "65%" }}
            className="mb-3 container"
            controlId="avatar"
          >
            <Form.Label>Avatar</Form.Label>
            <Form.Control type="file" ref={avatar} />
          </Form.Group>
          <Form.Group style={{ width: "65%" }} className="mb-3 container">
            <Button variant="secondary" type="submit">
              Đăng Ký
            </Button>
          </Form.Group>
        </Form>
      </Container>
    </>
  );
};
export default Register;

const RegisterForm = (props) => {
  return (
    <Form.Group
      style={{ width: "65%" }}
      className="mb-3 container"
      controlId={props.id}
    >
      <Form.Label>{props.lable}</Form.Label>
      <Form.Control
        type={props.type}
        placeholder={`Enter ${props.lable}`}
        value={props.value}
        onChange={props.change}
        name={props.name}
      />
      <Form.Control.Feedback type="invalid">
        Please choose a username.
      </Form.Control.Feedback>
    </Form.Group>
  );
};
