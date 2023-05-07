import React from "react";

const Footer = () => {
  const myStyle = {
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  };
  return (
    <div className=" my-5">
      <footer className="bg-secondary text-center text-lg-start text-white">
        <div className="container p-4">
          <div className="row my-4">
            <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
              <div
                className="rounded-circle bg-white shadow-1-strong d-flex align-items-center justify-content-center mb-4 mx-auto"
                style={{ width: "150px", height: "150px" }}
              >
                <img
                  src="https://res.cloudinary.com/dif0oia5b/image/upload/v1683160049/purepn_cyttje.png"
                  height="70"
                  alt=""
                  loading="lazy"
                />
              </div>

              <p className="text-center">
                Dù xa hay gần. Hãy để chúng tôi đồng hành cùng bạn!
              </p>

              <ul className="list-unstyled d-flex flex-row justify-content-center">
                <li>
                  <a className="text-white px-2" href="#!">
                    <i className="fab fa-facebook-square"></i>
                  </a>
                </li>
                <li>
                  <a className="text-white px-2" href="#!">
                    <i className="fab fa-instagram"></i>
                  </a>
                </li>
                <li>
                  <a className="text-white ps-2" href="#!">
                    <i className="fab fa-youtube"></i>
                  </a>
                </li>
              </ul>
            </div>

            <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
              <h5 className="text-uppercase mb-4">Về chúng tôi</h5>

              <ul className="list-unstyled">
                <li className="mb-2">
                  <a
                    href="#!"
                    className="text-white"
                    style={{ textDecoration: "none" }}
                  >
                    <i class="fas fa-info-circle pe-3"></i>Lịch trình
                  </a>
                </li>
                <li className="mb-2">
                  <a
                    href="#!"
                    className="text-white"
                    style={{ textDecoration: "none" }}
                  >
                    <i class="fas fa-info-circle pe-3"></i>Tra cứu thông tin
                  </a>
                </li>

                <li className="mb-2">
                  <a
                    href="#!"
                    className="text-white"
                    style={{ textDecoration: "none" }}
                  >
                    <i class="fas fa-info-circle pe-3"></i>Tin tức
                  </a>
                </li>
                <li className="mb-2">
                  <a
                    href="#!"
                    className="text-white"
                    style={{ textDecoration: "none" }}
                  >
                    <i class="fas fa-info-circle pe-3"></i>Điều khoản sử dụng
                  </a>
                </li>
              </ul>
            </div>

            <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
              <h5 className="text-uppercase mb-4">Dành cho bạn</h5>

              <ul className="list-unstyled">
                <li className="mb-2">
                  <a
                    href="#!"
                    className="text-white"
                    style={{ textDecoration: "none" }}
                  >
                    <i class="fas fa-info-circle pe-3"></i>Tuyến xe
                  </a>
                </li>

                <li className="mb-2">
                  <a
                    href="#!"
                    className="text-white"
                    style={{ textDecoration: "none" }}
                  >
                    <i class="fas fa-info-circle pe-3"></i>Hướng dẫn đặt vé
                  </a>
                </li>
                <li className="mb-2">
                  <a
                    href="#!"
                    className="text-white"
                    style={{ textDecoration: "none" }}
                  >
                    <i class="fas fa-info-circle pe-3"></i>Văn phòng
                  </a>
                </li>
                <li className="mb-2">
                  <a
                    href="#!"
                    className="text-white"
                    style={{ textDecoration: "none" }}
                  >
                    <i class="fas fa-info-circle pe-3"></i>Hỏi đáp
                  </a>
                </li>
              </ul>
            </div>

            <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
              <h5 className="text-uppercase mb-4">Liên hệ</h5>

              <ul className="list-unstyled">
                <li>
                  <p>
                    <i className="fas fa-map-marker-alt pe-2"></i>371 Nguyễn
                    Kiệm, Gò Vấp, TP HCM
                  </p>
                </li>
                <li>
                  <p>
                    <i className="fas fa-phone pe-2"></i>+ 01 234 567 89
                  </p>
                </li>
                <li>
                  <p>
                    <i className="fas fa-envelope pe-2 mb-0"></i>
                    email@email.com
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="text-center p-3" style={myStyle}>
          © 2023 Copyright:{" "}
          <a
            style={{ textDecoration: "none" }}
            className="text-white "
            href="https://github.com/Nguyen021/Station"
          >
            Dương Trung Nguyên - Hà Trường Nguyên
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
