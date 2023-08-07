import { useState } from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

import Gray from "../Color/Gray";
import Pink from "../Color/Pink";

function Basic({ className, placeholder, type, status, value, onChange }) {
  const [isFocus, setFocus] = useState(false);
  const [initialValue, setInitialValue] = useState("");

  const _value = value || initialValue;
  const _onChange = onChange || setInitialValue;

  const onChangeValue = (event) => {
    event.preventDefault();
    let value = event.target.value;
    return _onChange(value);
  };

  return (
    <Input
      className={`Input_Basic ${className}`}
      css={css({
        borderColor:
          status === "invalid"
            ? Pink[500]
            : isFocus
            ? Gray[700]
            : "rgba(95, 92, 93, 0.18)",
      })}
    >
      <input
        className="Input_Basic-input"
        placeholder={placeholder}
        onFocus={() => setFocus(true)}
        onBlur={() => {
          setFocus(false);
        }}
        value={_value}
        onChange={onChangeValue}
        type={type}
      />
    </Input>
  );
}

const defaultProps = {
  className: "",
  placeholder: "Placeholder",
  type: null,
  status: "default",
  value: "",
  onChange: null,
};

Basic.defaultProps = defaultProps;

export const Input = styled.div`
  display: flex;
  height: 40px;
  border-bottom: solid 1px;
  width: 100%;
  background: none;
  border-color: rgba(95, 92, 93, 0.18);
  transition: 0.3s ease-in-out;
  .Input_Basic-input {
    padding: 0px;
    border: none;
    border-radius: inherit;
    outline: none;
    background: inherit;
    font-size: 16px;
    font-weight: 600;
    transition: color 0.3s ease-in-out;
    width: 100%;
    line-height: 24px;
    letter-spacing: -0.16px;
  }
  input::placeholder {
    color: rgba(95, 92, 93, 0.36);
  }
`;

export default Basic;
