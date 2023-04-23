import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function WaitLoading() {
  const notifyPending = () => toast.info("Đang đăng nhập...");
  const notifySuccess = () => toast.success("Đăng nhập thành công!");
  const notifyError = () => toast.error("Đăng nhập thất bại!");

  return (
    <div>
      <ToastContainer />
      <h2>Đang tải...</h2>
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Đang tải...</span>
      </div>
    </div>
  );
}

export default WaitLoading;
