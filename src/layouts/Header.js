import React, { useContext, useState } from "react";
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBBtn,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBCollapse,
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

export default function Header() {
  const [showBasic, setShowBasic] = useState(false);
  const [user, dispatch] = useContext(UserContext);

  let userInformation = (
    <>
      <MDBNavbarItem>
        <Link to="/register" className="text-decoration-none">
          <MDBNavbarLink>Đăng ký</MDBNavbarLink>
        </Link>
      </MDBNavbarItem>
      <MDBNavbarItem>
        <Link to="/login" className="text-decoration-none">
          <MDBNavbarLink>Đăng nhập</MDBNavbarLink>
        </Link>
      </MDBNavbarItem>
    </>
  );

  const Logout = () => {
    dispatch({
      type: "logout",
    });
  };
  if (user !== null)
    userInformation = (
      <>
        <MDBNavbarItem>
          <MDBDropdown>
            <MDBNavbarLink className="d-flex align-items-center">
              <MDBDropdownToggle tag="a" className="hidden-arrow">
                <img
                  src={user.image}
                  className="rounded-circle"
                  height="30"
                  width="30"
                  alt={user.username}
                  loading="lazy"
                />
              </MDBDropdownToggle>
            </MDBNavbarLink>
            <MDBDropdownMenu>
              <MDBDropdownItem link>MyProfile</MDBDropdownItem>
              <MDBDropdownItem link>Settings</MDBDropdownItem>
              <MDBDropdownItem link>
                <Link
                  className="text-decoration-none"
                  to="/login"
                  onClick={Logout}
                >
                  Logout
                </Link>
              </MDBDropdownItem>
            </MDBDropdownMenu>
          </MDBDropdown>
        </MDBNavbarItem>
      </>
    );

  return (
    <header>
      <MDBNavbar
        className="m-2 border border-danger square rounded-6"
        expand="lg"
        light
        bgColor="light"
      >
        <MDBContainer fluid>
          <MDBNavbarBrand href="#">Station App</MDBNavbarBrand>

          <MDBNavbarToggler
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={() => setShowBasic(!showBasic)}
          >
            <MDBIcon icon="bars" fas />
          </MDBNavbarToggler>

          <MDBCollapse navbar show={showBasic}>
            <MDBNavbarNav className="mr-auto mb-2 mb-lg-0">
              <MDBNavbarItem>
                <Link to="/" className="text-decoration-none">
                  <MDBNavbarLink active aria-current="page">
                    Home
                  </MDBNavbarLink>
                </Link>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBDropdown>
                  <MDBDropdownToggle tag="a" className="nav-link" role="button">
                    Dropdown
                  </MDBDropdownToggle>
                  <MDBDropdownMenu>
                    <MDBDropdownItem link>Action</MDBDropdownItem>
                    <MDBDropdownItem link>Another action</MDBDropdownItem>
                    <MDBDropdownItem link>Something else here</MDBDropdownItem>
                  </MDBDropdownMenu>
                </MDBDropdown>
              </MDBNavbarItem>
              {userInformation}
              {/* <MDBNavbarItem>
                <MDBDropdown>
                  <MDBNavbarLink className="me-3 me-lg-0">
                    <MDBDropdownToggle tag="a" className="hidden-arrow">
                      <MDBIcon fas icon="bell" />
                      <MDBBadge pill notification color="danger">
                        1
                      </MDBBadge>
                    </MDBDropdownToggle>
                  </MDBNavbarLink>
                  <MDBDropdownMenu>
                    <MDBDropdownItem link>Some news</MDBDropdownItem>
                    <MDBDropdownItem link>Another new</MDBDropdownItem>
                    <MDBDropdownItem link>Something else</MDBDropdownItem>
                  </MDBDropdownMenu>
                </MDBDropdown>
              </MDBNavbarItem> */}
            </MDBNavbarNav>

            <form className="d-flex input-group w-auto">
              <input
                type="search"
                className="form-control"
                placeholder="Type query"
                aria-label=""
              />
              <MDBBtn color="primary">Search</MDBBtn>
            </form>
          </MDBCollapse>
        </MDBContainer>
      </MDBNavbar>
    </header>
  );
}
