import React, { useEffect } from "react";
import { useContext, useState } from "react";
import { ContextUser } from "../configs/ContextUser";
import IButton from "../layouts/items/iButton";
import ISelectBox from "../layouts/items/iSelectBox";
import { Form, Row, Col, Card, Button, Spinner } from "react-bootstrap";
import Apis, { endpoints } from "../configs/Apis";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";

const Home = () => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const [loading, setLoading] = useState(false);

  const [startPoints, setStartPoints] = useState([]);
  const [endPoints, setEndPoints] = useState([]);

  const [tripData, setTripData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().slice(0, 10)
  );

  let loadItem = (
    <Button
      variant=""
      size="lg"
      disabled
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Spinner
        as="span"
        animation="border"
        size="sm"
        role="status"
        aria-hidden="true"
      />
      <span style={{ marginLeft: "10px" }}>Đang tìm chuyến...</span>
    </Button>
  );

  const handleFromChange = (event) => {
    setFrom(event.target.value);
  };

  const handleGet = async () => {
    try {
      const response = await Apis.get(endpoints["list-start-end-point"]);
      setEndPoints(response.data.end_points);
      setStartPoints(response.data.start_points);
      setFrom(response.data.start_points[0]);
      setTo(response.data.end_points[0]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleToChange = (event) => {
    setTo(event.target.value);
  };

  const handleSearchClick = async (event) => {
    event.preventDefault();
    setLoading(true);
    const searchTrip = async () => {
      if (from !== null && to !== null && selectedDate !== null) {
        let uri = `${endpoints["search"]}?start_point=${from}&end_point=${to}&start_time=${selectedDate}`;
        let res = await Apis.get(uri);
        setTripData(res.data.results);
        setTimeout(() => {
          console.log(tripData);
          setLoading(false);
          console.log(loading);
        }, 2000);
      }
    };
    await searchTrip();
  };

  const optionsStart = startPoints.map((point) => ({
    label: point,
    value: point,
  }));

  const optionsEnd = endPoints.map((point) => ({ label: point, value: point }));

  const handleDateChange = (event) => {
    const selectedDate = event.target.value;
    setSelectedDate(selectedDate);
  };

  const [user] = useContext(ContextUser);
  let btnBooking = (
    <Button variant="secondary">
      <em>
        {" "}
        <Link style={{ color: "white", textDecoration: "none" }} to="/login">
          Đăng Nhập
        </Link>{" "}
        để đặt vé
      </em>
    </Button>
  );
  if (user != null && user != undefined) {
    btnBooking = <Button variant="secondary">Đặt chuyến ngay</Button>;
  }
  useEffect(() => {
    handleGet();
  }, []);

  return (
    <div>
      <ToastContainer />
      <Form style={{ marginTop: "20px" }}>
        <Row>
          <Col>
            <Form.Group controlId="formFrom">
              <Form.Label>Điểm xuất phát</Form.Label>
              <ISelectBox options={optionsStart} onChange={handleFromChange} />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="formTo">
              <Form.Label>Điểm đến</Form.Label>
              <ISelectBox options={optionsEnd} onChange={handleToChange} />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>Ngày khởi hành</Form.Label>
              <Form.Control
                defaultValue={new Date().toISOString().slice(0, 10)}
                type="date"
                placeholder="name@example.com"
                format="dd-MM-yyyy"
                onChange={handleDateChange}
                min={new Date().toISOString().slice(0, 10)}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group
              style={{ marginTop: "31px" }}
              controlId="exampleForm.ControlInput1"
            >
              <Form.Label></Form.Label>
              <IButton
                style={{ marginBottom: "0px !important" }}
                onClick={handleSearchClick}
              />
            </Form.Group>
          </Col>
        </Row>
      </Form>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "20px",
          marginBottom: "20px",
        }}
      >
        <Card style={{ width: "58rem" }}>
          <Card.Img
            style={{ width: "30%" }}
            variant="top"
            src="https://res.cloudinary.com/dif0oia5b/image/upload/v1683160049/purepn_cyttje.png"
          />
          <Card.Body>
            <Card.Title>Nhà xe tiêu biểu</Card.Title>
            <Card.Text>Điểm đi: nơi bạn muốn đi</Card.Text>
            <Card.Text>Điểm đến: nơi bạn muốn đi</Card.Text>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <p style={{ fontWeight: "bold" }}>100.000 VNĐ</p>
              <div style={{ display: "flex" }}>
                <Button variant="secondary" style={{ marginRight: "10px" }}>
                  <Link style={{ color: "white", textDecoration: "none" }}>
                    Xem chi tiết
                  </Link>
                </Button>

                {btnBooking}
              </div>
            </div>
          </Card.Body>
        </Card>
      </div>

      {loading
        ? loadItem
        : tripData.map((item) => (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "20px",
                marginBottom: "20px",
              }}
            >
              <Card style={{ width: "58rem" }}>
                <Card.Img
                  style={{ width: "30%" }}
                  variant="top"
                  src={item.image}
                />
                <Card.Body>
                  <Card.Title>{item.station.name}</Card.Title>
                  <Card.Text>
                    Số ghế trống:{" "}
                    <span style={{ fontWeight: "bold" }}>
                      {item.available_seats}
                    </span>{" "}
                  </Card.Text>
                  <Card.Text>
                    Tuyến:{" "}
                    <span style={{ fontWeight: "bold" }}>
                      {item.route.start_point} - {item.route.end_point}{" "}
                    </span>
                  </Card.Text>
                  <Card.Text>
                    Khoảng cách:
                    <span style={{ fontWeight: "bold" }}>
                      {item.route.distance} KM
                    </span>
                  </Card.Text>{" "}
                  <Card.Text>
                    Trong khoảng :{" "}
                    <span style={{ fontWeight: "bold" }}>
                      {item.route.duration} h
                    </span>
                  </Card.Text>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <p style={{ fontWeight: "bold" }}>
                      {" "}
                      Giá vé:
                      {item.price.toLocaleString()} VNĐ
                    </p>
                    <div style={{ display: "flex" }}>
                      <Button
                        variant="secondary"
                        style={{ marginRight: "10px" }}
                      >
                        <Link
                          style={{ color: "white", textDecoration: "none" }}
                          to={`/detail/${item.id}`}
                        >
                          Xem chi tiết
                        </Link>
                      </Button>
                      {btnBooking}
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </div>
          ))}
    </div>
  );
};

export default Home;
