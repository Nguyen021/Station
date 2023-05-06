import React from "react";
import { Button, Spinner } from "react-bootstrap";

const ILoad = () => {
  return (
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
      <span style={{ marginLeft: "10px" }}>Đang tìm kiếm...</span>
    </Button>
  );
};

export default ILoad;
