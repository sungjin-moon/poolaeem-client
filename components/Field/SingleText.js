import styled from "@emotion/styled";

import Field from "./index";
import Input from "../Input/Basic";

function SingleText({ className, label, required, item, onChange }) {
  return (
    <Field
      className={`Field_SingleText ${className}`}
      label={label}
      required={required}
      message={item.message}
    >
      <Input
        {...item}
        onChange={(value) => onChange({ ...item, value }, required)}
      />
    </Field>
  );
}

const defaultProps = {
  className: "",
  label: "Label",
  required: true,
  item: {},
  onChange: () => {},
};

SingleText.defaultProps = defaultProps;

export const Wrapper = styled.div``;

export default SingleText;
