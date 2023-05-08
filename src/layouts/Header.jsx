import React, { useContext, useEffect, useState } from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { ContextUser } from "../configs/ContextUser";
import Apis, { endpoints } from "../configs/Apis";
import cookies from "react-cookies";
import ILoad from "./items/iLoad";

const Header = () => {
  const nav = useNavigate();
  const [user, dispatch] = useContext(ContextUser);
  const [loading, setLoading] = useState(false);
  const [listStation, setListStation] = useState([]);

  const logout = () => {
    cookies.remove("access-token");
    cookies.remove("current-user");
    dispatch({
      type: "logout",
    });
  };

  let userInfo = <></>;
  if (user === null)
    userInfo = (
      <>
        <li className="nav-item">
          <Link className="nav-link" to="/login">
            Đăng nhập
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/register">
            Đăng ký
          </Link>
        </li>
      </>
    );

  let varUser = <></>;
  if (user !== null)
    varUser = (
      <>
        <div className="d-flex align-items-center">
          Chào {"  "}
          {user.username ? (
            <span style={{ fontWeight: "bold", color: "blue" }}>
              {` - ${user.username}`}
            </span>
          ) : (
            "bạn"
          )}
          <Dropdown>
            <Dropdown.Toggle
              variant=""
              id="dropdown-basic"
              style={{ fontSize: "1.2em", marginRight: "30px" }}
            >
              <img
                src={
                  user.image
                    ? user.image
                    : "https://res.cloudinary.com/dif0oia5b/image/upload/v1670231621/avatar/member_djdnrm.jpg"
                }
                className="rounded-circle"
                height="40"
                width="40"
                alt="User Avatar"
                loading="lazy"
              />
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1">My profile</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Vé đã đặt</Dropdown.Item>
              {user.is_station ? (
                <>
                  <Dropdown.Item as={Link} to={"/manage-station/"}>
                    Quản lý nhà xe
                  </Dropdown.Item>
                  <Dropdown.Item as={Link} to={"/stats-station/"}>
                    Thống kê & Báo cáo
                  </Dropdown.Item>
                </>
              ) : null}
              <Dropdown.Item onClick={logout}>Đăng xuất</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </>
    );

  const getListStation = async () => {
    setLoading(true);
    try {
      let response = await Apis.get(endpoints["list-station"]);
      const data = await response.data.results;
      setListStation(data);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    } catch (err) {
      console.error(err);
    } finally {
      console.log(listStation);
    }
  };

  useEffect(() => {
    getListStation();
    console.log(user);
  }, []);

  // if (loading) {
  //   return <ILoad />;
  // }
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-mdb-toggle="collapse"
          data-mdb-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i className="fas fa-bars"></i>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <a className="navbar-brand mt-2 mt-lg-0" href="#">
            <img
              src="https://res.cloudinary.com/dif0oia5b/image/upload/v1680433065/des_jyynpx.png"
              height="45"
              alt="MDB Logo"
              loading="lazy"
            />
          </a>

          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link fw-bold" to="/">
                Station Manager
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Đặt vé ngay
              </Link>
            </li>

            {loading ? (
              <ILoad />
            ) : (
              <DropdownButton
                variant=""
                id="dropdown-basic-button"
                title="Chọn theo nhà xe"
              >
                {listStation.map((station) => (
                  <Dropdown.Item as={Link} to={`/detail-station/${station.id}`}>
                    {station.name}
                  </Dropdown.Item>
                ))}
              </DropdownButton>
            )}
            {userInfo}
          </ul>
        </div>
        {varUser}

        <div className="d-flex align-items-center"></div>
      </div>
    </nav>
  );
};

export default Header;
