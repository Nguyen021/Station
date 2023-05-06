import React from "react";
import { Button, Spinner } from "react-bootstrap";

const Loading = () => {
  return (
    <Button size="sm" variant="primary" disabled>
      <Spinner
        as="span"
        animation="grow"
        size="lg"
        role="status"
        aria-hidden="true"
      />
      Đang tải...
    </Button>
  );
};

export default Loading;
