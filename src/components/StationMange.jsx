import React, { useContext, useEffect, useState } from "react";
import { ContextUser } from "../configs/ContextUser";
import {
  Button,
  Card,
  Col,
  Container,
  ListGroup,
  Nav,
  NavItem,
  Row,
} from "react-bootstrap";
import ILoad from "../layouts/items/iLoad";
import "../scss/StationManage.scss";
import { Link, useNavigate } from "react-router-dom";
import { authAPI, endpoints } from "../configs/Apis";
import ComingSoon from "react-coming-soon";

const StationMange = () => {
  const [listTrip, setListTrip] = useState([]);
  const [user] = useContext(ContextUser);
  const [listStation, setListStation] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingTrip, setLoadingTrip] = useState(false);
  const navigate = useNavigate();
  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const hour = date.getHours().toString().padStart(2, "0");
    const minute = date.getMinutes().toString().padStart(2, "0");

    return `${hour}h:${minute} - ${day} ${month} ${year} `;
  }
  const loadListStation = async () => {
    console.log("start");
    console.log(loading);
    setLoading(true);
    if (user != null && user != undefined) {
      try {
        const data = await user.stations;
        setListStation(data);
        setTimeout(() => {
          setLoading(false);
          console.log(listStation);
          console.log(loading);
        }, 500);
      } catch (ex) {
      } finally {
        console.log("load list Station");
      }
    }
  };

  const getListTripByStation = async (id) => {
    setLoadingTrip(true);
    try {
      let res = await authAPI().get(endpoints["get-trip-by-station"](id));
      const data = await res.data;
      console.log(res.data);
      setListTrip(data);
      setTimeout(() => {
        setLoadingTrip(false);
      }, 1000);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    // if (listStation) {
    //   filterDataReport(typeReport, resultsReport);
    // }
  }, [listStation]);
  useEffect(() => {
    setLoading(true);
    loadListStation();
  }, []);
  if (user === null || user === undefined) {
    return (
      <>
        <ComingSoon />
      </>
    );
  } else if (!user.is_station) {
    navigate("/"); // Chuyển hướng sang trang "/""
    return null;
  }
  return (
    <>
      <h1 className="text-center text-secondary">Nhà xe của Tôi</h1>
      <Row>
        <Col md={5} xs={12}>
          {" "}
          <Nav variant="pills" className="flex-column">
            {loading ? (
              <ILoad />
            ) : (
              <Container>
                {listStation.map((station) => (
                  <Card style={{ width: "100%" }} className="mb-1">
                    <Card.Body>
                      <Card.Title className="text-center">
                        {station.name}
                      </Card.Title>
                      <Card.Text>
                        Some quick example text to build on the card title and
                        make up the bulk of the card's content.
                      </Card.Text>
                    </Card.Body>
                    <ListGroup className="list-group-flush">
                      <ListGroup.Item>
                        <i class="fa-solid fa-location-dot"></i>{" "}
                        {station.address}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        {" "}
                        Trạng thái:
                        {station.active ? " Đang hoạt động" : "Ngưng hoạt động"}
                      </ListGroup.Item>
                      <ListGroup.Item>Số chuyến xe: </ListGroup.Item>
                    </ListGroup>
                    <Card.Body>
                      <Button
                        style={{ fontWeight: "bold", color: "gray" }}
                        variant=""
                      >
                        Chỉnh sửa nhà xe
                      </Button>
                      <Button
                        onClick={() => getListTripByStation(station.id)}
                        style={{ fontWeight: "bold", color: "gray" }}
                        variant=""
                      >
                        Xem tuyến xe
                      </Button>
                    </Card.Body>
                  </Card>
                ))}
              </Container>
            )}
          </Nav>
        </Col>

        <Col md={7} xs={12}>
          {loadingTrip ? (
            <ILoad />
          ) : (
            <>
              {listTrip.map((trip) => (
                <>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      marginTop: "10px",
                      marginBottom: "10px",
                    }}
                  >
                    <Card style={{ width: "58rem" }}>
                      <Card.Img
                        style={{ width: "20%" }}
                        variant="top"
                        src={trip.image}
                      />
                      <Card.Body>
                        <small>Chuyến của {trip.station.name}</small>
                        <Card.Title>Mã chuyến xe: {trip.id}</Card.Title>
                        <Card.Text>
                          Tuyến -{" "}
                          <strong>
                            {trip.route.start_point} đi {trip.route.end_point}{" "}
                          </strong>
                        </Card.Text>
                        <ListGroup>
                          <ListGroup.Item>
                            <strong style={{ color: "gray" }}>Giá: </strong>
                            {trip.price.toLocaleString()} VNĐ
                          </ListGroup.Item>
                          <ListGroup.Item
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <div>
                              <strong style={{ color: "gray" }}>
                                Thời gian bắt đầu:
                              </strong>{" "}
                              {formatDate(trip.start_time)}
                            </div>
                            <div>
                              <strong style={{ color: "gray" }}>
                                Thời gian kết thúc:
                              </strong>{" "}
                              {formatDate(trip.end_time)}
                            </div>
                          </ListGroup.Item>

                          <ListGroup.Item
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <div>
                              {" "}
                              <strong style={{ color: "gray" }}>
                                Tổng số ghế:
                              </strong>{" "}
                              {trip.total_seats}
                            </div>
                            <div>
                              <strong style={{ color: "gray" }}>
                                Số ghế trống:
                              </strong>{" "}
                              {trip.available_seats}
                            </div>
                          </ListGroup.Item>
                          <ListGroup.Item
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <div>
                              {" "}
                              <strong style={{ color: "gray" }}>
                                License:
                              </strong>{" "}
                              {trip.bus.license}
                            </div>
                            <div>
                              {" "}
                              <strong style={{ color: "gray" }}>
                                Tài xế:
                              </strong>{" "}
                              {trip.bus.driver}
                            </div>
                          </ListGroup.Item>
                        </ListGroup>

                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <div style={{ display: "flex" }}>
                            <Button style={{ fontWeight: "bold" }} variant="">
                              Chỉnh sửa chuyến
                            </Button>
                          </div>
                        </div>
                      </Card.Body>
                    </Card>
                  </div>
                </>
              ))}
            </>
          )}
        </Col>
      </Row>
    </>
  );
};

export default StationMange;
