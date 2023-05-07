import { Form } from "react-bootstrap";

const ISelectBox = ({ value, options, onChange }) => {
  return (
    <Form.Select onChange={onChange} value={value}>
      <option value="0">-- Mời chọn ---</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </Form.Select>
  );
};
export default ISelectBox;
