import React, { useEffect } from "react";
import { useContext, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ContextUser } from "../configs/ContextUser";
import Apis, { authAPI, endpoints } from "../configs/Apis";
import { Card, Col, Container, ListGroup, Navbar, Row } from "react-bootstrap";
import ILoad from "../layouts/items/iLoad";
import IError from "../layouts/items/iError";
import { ToastContainer, toast } from "react-toastify";
import Rating from "react-rating";

const StationDetail = () => {
  const [listTrip, setListTrip] = useState([]);
  const { stationId } = useParams();
  const [loading, setLoading] = useState(true);
  const [station, setStation] = useState({});
  const [user] = useContext(ContextUser);

  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const hour = date.getHours().toString().padStart(2, "0");
    const minute = date.getMinutes().toString().padStart(2, "0");

    return `${hour}h:${minute}m - ngày ${day} ${month} ${year} `;
  }

  const getDetailsStation = async () => {
    try {
      await authAPI()
        .get(endpoints["station-detail"](stationId))
        .then((res) => res.data)
        .then((data) => setStation(data));
    } catch (err) {
      console.error(err);
    }
  };
  const handleRating = (rate) => {
    const handle = async () => {
      try {
        let res = await authAPI().post(endpoints["rate-station"](stationId), {
          rating: rate,
        });
        console.log(res);
        if (res.status === 200) {
          getDetailsStation();
        }
      } catch (ex) {
        console.error(ex);
      }
    };
    handle();
  };
  const getListTripByStation = async () => {
    setLoading(true);
    try {
      let res = await authAPI().get(
        endpoints["get-trip-by-station"](stationId)
      );
      const data = await res.data;
      setListTrip(data);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    getListTripByStation();
    getDetailsStation();
  }, [stationId]);

  if (listTrip.length === 0) {
    let err = "Không tìm thấy chuyến xe nào";

    return (
      <>
        {" "}
        <ToastContainer />
        <div style={{ marginTop: "10px" }}>
          <IError err={err} />
        </div>
      </>
    );
  }
  return (
    <>
      <Container style={{ padding: "20px", marginTop: "20px" }}>
        {loading ? (
          <ILoad />
        ) : (
          <>
            <div
              style={{
                marginBottom: "10px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <i
                className="fa-solid fa-bars "
                style={{
                  fontSize: "20px",
                  marginRight: "10px",
                  verticalAlign: "middle",
                }}
              ></i>
              <h5
                style={{
                  fontWeight: "bold",
                  fontSize: "20px",
                  margin: "0",
                }}
              >
                {listTrip[0].station.name}
              </h5>
            </div>
            <div
              style={{
                marginBottom: "10px",
                display: "flex",
                alignItems: "center",
              }}
            >
              {" "}
              <i
                style={{
                  fontSize: "20px",
                  marginRight: "10px",
                  verticalAlign: "middle",
                }}
                class="fa-sharp fa-solid fa-location-dot"
              ></i>
              <h6>Địa chỉ: {listTrip[0].station.address}</h6>
              <h6 style={{ verticalAlign: "middle", marginLeft: "20px" }}>
                Đánh giá {station.total_rating} /5{" "}
                <i class="fa-solid fa-star fa-lg"></i>
              </h6>{" "}
              <h6 style={{ verticalAlign: "middle", marginLeft: "20px" }}>
                Số lượt đánh giá: {station.num_ratings} lượt
              </h6>{" "}
            </div>
            <div
              style={{
                marginBottom: "10px",
                display: "flex",
                alignItems: "center",
              }}
            >
              {" "}
              <Rating
                onClick={handleRating}
                emptySymbol="fa-regular fa-star fa-xl"
                fullSymbol="fa-solid fa-star fa-xl"
                initialRating={station.rate !== null ? station.rate : 0}
              />
            </div>
            <div
              style={{
                marginBottom: "10px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Link
                to={`/chat/${stationId}`}
                style={{ color: "gray", fontWeight: "bold" }}
              >
                {" "}
                <i
                  style={{
                    marginRight: "10px",
                    verticalAlign: "middle",
                    color: "black",
                  }}
                  class="fa-sharp fa-solid fa-comments fa-xl"
                ></i>
                Liên Hệ Nhà Xe
              </Link>{" "}
            </div>

            <Row>
              {listTrip.map((trip) => (
                <Col md={4}>
                  <Card className="p-3" style={{ width: "100%" }}>
                    <Card.Img
                      className="fluid"
                      variant="top"
                      src={trip.image}
                      style={{ height: "250px", objectFit: "cover" }}
                    />
                    <Card.Body>
                      <Card.Title>
                        {trip.route.start_point} - {trip.route.end_point}
                      </Card.Title>
                      <Card.Text>
                        Thời gian bắt đầu: {formatDate(trip.start_time)} <br />
                        Dự kiến đến vào: {formatDate(trip.end_time)}
                      </Card.Text>
                    </Card.Body>
                    <ListGroup className="list-group-flush">
                      <ListGroup.Item>
                        Giá: {trip.price.toLocaleString()} VNĐ
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <i class="fa-solid fa-location-dot"></i>{" "}
                        {trip.station.address}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        {" "}
                        <i class="fa-solid fa-location-dot"></i>{" "}
                        {trip.route.end_point}
                      </ListGroup.Item>

                      <ListGroup.Item>
                        Khoảng cách: {trip.route.distance} Km
                      </ListGroup.Item>
                    </ListGroup>
                    <Card.Body>
                      <Link
                        to={`/detail/${trip.id}`}
                        style={{
                          textDecoration: "none",
                          fontWeight: "bold",
                          color: "gray",
                        }}
                      >
                        Xem chi tiết
                      </Link>
                      <Link
                        to="/"
                        style={{
                          textDecoration: "none",
                          fontWeight: "bold",
                          color: "gray",
                          marginLeft: "135px",
                        }}
                      >
                        Đặt vé ngay
                      </Link>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </>
        )}
      </Container>
    </>
  );
};

export default StationDetail;
