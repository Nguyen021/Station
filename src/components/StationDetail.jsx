import React, { useEffect } from "react";
import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { ContextUser } from "../configs/ContextUser";
import Apis, { authAPI, endpoints } from "../configs/Apis";
import { Card, Col, Container, ListGroup, Navbar, Row } from "react-bootstrap";
import ILoad from "../layouts/items/iLoad";
import IError from "../layouts/items/iError";

const StationDetail = () => {
  const [listTrip, setListTrip] = useState([]);
  const { stationId } = useParams();
  const [loading, setLoading] = useState(true);
  const [user] = useContext(ContextUser);
  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const hour = date.getHours().toString().padStart(2, "0");
    const minute = date.getMinutes().toString().padStart(2, "0");

    return `${hour}:${minute} ${day}-${month}-${year} `;
  }

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
    } finally {
      console.log(listTrip);
    }
  };
  useEffect(() => {
    getListTripByStation();
  }, [stationId]);

  if (listTrip.length === 0) {
    let err = "Không tìm thấy chuyến xe";
    return (
      <>
        <IError err={err} />
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
              <i
                style={{
                  fontSize: "20px",
                  marginRight: "10px",
                  verticalAlign: "middle",
                }}
                class="fa-sharp fa-solid fa-location-dot"
              ></i>
              <h6>Địa chỉ: {listTrip[0].station.address}</h6>
            </div>

            <Row>
              {listTrip.map((trip) => (
                <Col md={4}>
                  <Card className="p-3" style={{ width: "100%" }}>
                    <Card.Img variant="top" src={trip.image} />
                    <Card.Body>
                      <Card.Title>
                        {trip.route.start_point} - {trip.route.end_point}
                      </Card.Title>
                      <Card.Text>
                        Thời gian bắt đầu: {formatDate(trip.start_time)}
                        Dự kiến đến vào: {formatDate(trip.end_time)}
                      </Card.Text>
                    </Card.Body>
                    <ListGroup className="list-group-flush">
                      <ListGroup.Item>Giá {trip.price}</ListGroup.Item>
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
                      <Card.Link href="#">Card Link</Card.Link>
                      <Card.Link href="#">Another Link</Card.Link>
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
