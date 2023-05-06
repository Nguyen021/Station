import { Button } from "react-bootstrap";

const IButton = ({ onClick }) => {
  return (
    <Button variant="secondary" onClick={onClick}>
      Tìm kiếm
    </Button>
  );
};

export default IButton;
