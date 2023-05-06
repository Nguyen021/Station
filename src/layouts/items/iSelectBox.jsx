import { Form } from "react-bootstrap";

const ISelectBox = ({ options, onChange }) => {
  return (
    <Form.Select onChange={onChange}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </Form.Select>
  );
};
export default ISelectBox;
