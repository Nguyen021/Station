import React from "react";
import { Alert } from "react-bootstrap";

const ISuccess = ({ success }) => {
  return (
    <Alert key="success" variant="success">
      {success}
    </Alert>
  );
};

export default ISuccess;
