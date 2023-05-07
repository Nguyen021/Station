import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { ContextUser } from "../configs/ContextUser";
import Apis, { authAPI, endpoints } from "../configs/Apis";
import {
  Button,
  Col,
  Container,
  Form,
  Image,
  Row,
  Spinner,
} from "react-bootstrap";
import "../scss/TripDetail.scss";
import ILoad from "../layouts/items/iLoad";
import Moment from "react-moment";
import { ToastContainer, toast } from "react-toastify";
import ISuccess from "../layouts/items/iSuccess";
const TripDetail = () => {
  const [trip, setTrip] = useState(null);
  const { tripId } = useParams();
  const [loading, setLoading] = useState(false);
  const [user] = useContext(ContextUser);
  const [comments, setComments] = useState(null);
  const [commentContent, setCommentContent] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [success, setSuccess] = useState(false);

  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const hour = date.getHours().toString().padStart(2, "0");
    const minute = date.getMinutes().toString().padStart(2, "0");

    return `${hour}:${minute} ${day}-${month}-${year} `;
  }

  const loadTripDetail = async () => {
    setLoading(true);
    console.log(loading);
    try {
      let res = await authAPI().get(endpoints["trip-detail"](tripId));
      setTrip(res.data);
      setTimeout(() => {
        setLoading(false);
      }, 500);
    } catch (err) {
      console.error(err);
    } finally {
    }
  };

  const loadListComments = async () => {
    setLoading(true);
    try {
      let res = await Apis.get(endpoints["list-comment-trip"](tripId));
      const data = await res.data;
      setComments(data);
      setTimeout(() => {
        setLoading(false);
      }, 500);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handlePostComment = async (event) => {
    event.preventDefault();
    setIsButtonDisabled(true);
    const handle = async () => {
      try {
        let res = await authAPI().post(endpoints["create-comment"](tripId), {
          content: commentContent,
        });
        setComments((current) => [res.data, ...current]);
        setSubmitted(true);
        setCommentContent("");
      } catch (ex) {
        let message = "";

        console.log(ex);
      } finally {
        if (submitted === true) {
          toast.success("Đăng bình luận thành công!");
          // Thực hiện các hành động cần thiết khi submit thành công
        } else {
          toast.error("Đăng bình luận thất bại!");
          // Thực hiện các hành động cần thiết khi submit thất bại
        }
        // setLoading(false);
      }
    };
    // setLoading(true);

    if (commentContent.trim() === "") {
      await toast.error("Không được để trống");
      setTimeout(() => setIsButtonDisabled(false), 2000);
    } else {
      handle();
      setTimeout(() => setIsButtonDisabled(false), 2000);
    }
  };

  const addBooking = async () => {
    const handle = async () => {
      let res = await authAPI().post(endpoints["create-booking"], {
        number_of_seats: 2,
        payment_method: 2,
        trip_id: tripId,
        payment_status: 2,
      });
      const data = await res.data;
      console.log(res.status);
      if (res.status === 201) {
        setSuccess(true);
      }
    };
    handle();
  };

  useEffect(() => {
    loadTripDetail();
    loadListComments();
  }, [tripId]);

  if (trip === null) {
    return <ILoad />;
  }
  let btnComment = (
    <em>
      {" "}
      <Link to="/login">Đăng Nhập</Link> để post Bình Luận
    </em>
  );
  let btnBooking = (
    <button>
      <Link style={{ textDecoration: "none", color: "white" }} to={"/login"}>
        Đăng nhập để đặt vé
      </Link>{" "}
    </button>
  );
  if (user != null && user != undefined) {
    btnComment = (
      <Button
        disabled={isButtonDisabled}
        type="submit"
        variant="outline-secondary"
      >
        Thêm Bình Luận
      </Button>
    );
    btnBooking = <button onClick={addBooking}>Đặt vé ngay </button>;
  }

  return (
    <>
      <Container style={{ marginTop: "90px" }} className="trip-container">
        <ToastContainer autoClose={2000} />
        <Row>
          {success ? <ISuccess success="Đặt vé thành công !!!" /> : null}
          {loading ? (
            <ILoad />
          ) : (
            <>
              <Col xs={12} md={5}>
                <div className="content-left">
                  <div style={{ height: "440px" }}>
                    <Image
                      rounded
                      fluid
                      src={trip.image}
                      style={{ height: "345px", objectFit: "cover" }}
                    />
                  </div>
                </div>
              </Col>
              <Col xs={12} md={5}>
                <div className="content-center">
                  <h3>{trip.station.name}</h3>
                  <small>
                    Tyến xe: <strong> {trip.route.start_point} </strong>{" "}
                    <i
                      class="fa-solid fa-arrow-right"
                      style={{ marginRight: "10px", marginLeft: "8px" }}
                    ></i>
                    <strong>{trip.route.end_point}</strong>
                  </small>
                  <h5 className="top">
                    <i class="fa-solid fa-location-dot"></i>{" "}
                    {trip.station.address}
                  </h5>

                  <p>Thời gian bắt đầu: {formatDate(trip.start_time)}</p>
                  <p>Dự kiến đến vào: {formatDate(trip.end_time)} </p>
                  <h5>
                    <i class="fa-solid fa-location-dot"></i>{" "}
                    {trip.route.end_point}
                  </h5>
                  <h6>Khoảng cách: {trip.route.distance} Km</h6>
                  <h6>Khoảng thời gian: {trip.route.duration} giờ</h6>
                  <h6>License: {trip.bus.license}</h6>
                </div>
              </Col>
              <Col xs={12} md={2}>
                <div className="content-right">
                  <h6>Giá: {trip.price.toLocaleString()} VNĐ</h6>
                  <p>Tổng số ghế: {trip.total_seats}</p>
                  <p>Còn {trip.available_seats} chổ trống</p>

                  {btnBooking}
                </div>
              </Col>
            </>
          )}
        </Row>
      </Container>
      <hr />
      <Container
        style={{ marginTop: "10px", width: "100%", marginBottom: "20px" }}
        className="trip-container"
      >
        <Form
          onSubmit={handlePostComment}
          style={{ marginTop: "10px", width: "100%" }}
        >
          <Form.Group className="mb-3" controlId="comment">
            <Form.Label>Khu Vực Bình Luận</Form.Label>
            <Form.Control
              value={commentContent}
              onChange={(e) => setCommentContent(e.target.value)}
              placeholder="Comments"
              as="textarea"
              rows={3}
            />
          </Form.Group>
          {btnComment}
        </Form>
      </Container>
      <hr />
      {loading ? (
        <ILoad />
      ) : (
        <>
          {comments.map((c) => (
            <Row className="container-row-comment">
              <Col md={1} className="col"></Col>
              <Col md={1} xs={3} className="col col-image">
                <Image
                  src={
                    c.user.image
                      ? c.user.image
                      : "https://res.cloudinary.com/dif0oia5b/image/upload/v1670231621/avatar/member_djdnrm.jpg"
                  }
                  circle
                  fluid
                />
              </Col>

              <Col md={9} xs={9} className="col col-text">
                <p className="fw-bold mb-1">
                  {c.user.first_name} {c.user.last_name}
                </p>

                <p className="col-text-date">
                  <Moment fromNow>{c.created_date}</Moment>{" "}
                </p>
                <p className="col-text-content">{c.content}</p>
              </Col>
            </Row>
          ))}
        </>
      )}
    </>
  );
};

export default TripDetail;
