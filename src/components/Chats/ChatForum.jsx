import React, { useContext, useEffect, useState } from "react";
import { Badge, Button, Container, ListGroup } from "react-bootstrap";
import { ContextUser } from "../../configs/ContextUser";
import { authAPI, endpoints } from "../../configs/Apis";
import { useParams } from "react-router-dom";
import ILoad from "../../layouts/items/iLoad";
import {
  addDoc,
  collection,
  collectionGroup,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase/configs";
import { ToastContainer, toast } from "react-toastify";
const ChatForum = () => {
  const [station, setStation] = useState({});
  const [user] = useContext(ContextUser);
  const [load, setLoad] = useState(false);

  const [content, setContent] = useState("");
  const [listMessage, setListMessage] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [sender, setSender] = useState({
    email: "",
    first_name: "",
    last_name: "",
    username: "",
    avatar: "",
    id: "",
    is_station: "",
  });
  const [receiver, setReceiver] = useState({
    email: "",
    first_name: "",
    last_name: "",
    username: "",
    avatar: "",
    id: "",
    is_station: "",
  });
  const { stationId } = useParams();

  const getOwnerStation = async () => {
    try {
      await authAPI()
        .get(endpoints["get-user-detail"](station.user.id))
        .then((res) => res.data)
        .then((data) =>
          setReceiver({
            ...receiver,
            email: user.email,
            first_name: user.first_name,
            last_name: user.last_name,
            username: user.username,
            avatar: user.image,
            id: user.id,
            is_station: user.is_station,
          })
        );
    } catch (ex) {
      console.error(ex);
    }
  };

  const getDetailsStation = async () => {
    try {
      await authAPI()
        .get(endpoints["station-detail"](stationId))
        .then((res) => res.data)
        .then((data) => setStation(data))
        .then(() => getOwnerStation());
    } catch (err) {
      console.error(err);
    } finally {
      setSender({
        ...sender,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        username: user.username,
        avatar: user.image,
        id: user.id,
        is_station: user.is_station,
      });
    }
  };
  const handleSendMess = async () => {
    if (content.trim() !== "") {
      addDoc(collection(db, "messages"), {
        sender: sender,
        content: content,
        createdDate: new Date(),
        receiver: receiver,
      }).then(async (result) => {
        const docRef = doc(db, "messages", result.id);
        await updateDoc(docRef, {
          messageId: result.id,
        });
      });
    } else {
      toast.error("Vui lòng nhập nội dung!!!");
    }
  };

  const getAllMessagge = async () => {
    setLoad(true);
    const ref = collectionGroup(db, "messages");
    onSnapshot(query(ref, orderBy("createdDate", "desc")), (querySnapshot) => {
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push(doc.data());
      });
      const messages = [];
      for (const dat of data) {
        if (
          dat.sender.email === sender.email ||
          dat.receiver.email === sender.email
        ) {
          if (
            dat.sender.email === receiver.email ||
            dat.receiver.email === receiver.email
          ) {
            messages.push(dat);
          }
        }
      }
      setListMessage(messages);
      setLoad(false);
    });
  };

  useEffect(() => {
    getDetailsStation();
  }, []);
  useEffect(() => {
    getAllMessagge();
  }, []);
  return (
    <Container>
      <ToastContainer />
      {load ? (
        <ILoad />
      ) : (
        <h3 style={{ color: "gray", textAlign: "center" }}>
          Chào mừng đến với {station.name}
        </h3>
      )}
      <ListGroup className="p-4" style={{ width: "60%", margin: "auto" }}>
        <ListGroup.Item className="d-flex justify-content-between align-items-start">
          <div className=" ">
            <img
              src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
              className="rounded-circle"
              alt="Avatar"
              height="40"
              width="40"
            />
          </div>
          <div className="ms-2 me-auto">
            <div style={{ color: "gray" }} className="fw-bold">
              Subheading
            </div>
            Cras justo odio
          </div>
          <Badge bg="secondary" pill>
            14 phút trước
          </Badge>
        </ListGroup.Item>
        <div class="form-outline " style={{ marginTop: "20px" }}>
          <textarea
            placeholder="Nhập nội dung bạn muốn liên hệ"
            class="form-control"
            id="textAreaExample"
            rows="4"
            value={content}
            onChange={(event) => setContent(event.target.value)}
          ></textarea>
          <label class="form-label" for="textAreaExample"></label>
        </div>
        <Button variant="secondary" onClick={handleSendMess} type="button">
          Gửi
        </Button>
      </ListGroup>
    </Container>
  );
};

export default ChatForum;
