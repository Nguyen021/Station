import React from "react";
import { Alert } from "react-bootstrap";

const IError = ({ err }) => {
  return (
    <Alert key="danger" variant="danger">
      {err}
    </Alert>
  );
};

export default IError;
