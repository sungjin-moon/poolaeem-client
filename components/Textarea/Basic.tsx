import { useState } from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import TextareaAutosize from "react-textarea-autosize";

import Gray from "../Color/Gray";
import Pink from "../Color/Pink";

interface Props {
  className: string;
  placeholder: string;
  status: string;
  value: undefined | string;
  minRows?: undefined | number;
  maxRows?: undefined | number;
  maxLength?: undefined | number;
  onChange: undefined | ((value: string) => void);
}

function Basic({
  className,
  placeholder,
  status,
  value,
  minRows,
  maxRows,
  maxLength,
  onChange,
}: Props) {
  const [isFocus, setFocus] = useState(false);
  const [$value, $setValue] = useState("");

  const onChangeValue = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    event.preventDefault();
    const value = event.target.value;
    onChange ? onChange(value) : $setValue(value);
  };

  return (
    <Textarea
      className={`Textarea_Basic ${className}`}
      css={css({
        borderColor:
          status === "invalid"
            ? Pink[500]
            : isFocus
            ? Gray[700]
            : "rgba(95, 92, 93, 0.18)",
      })}
    >
      <TextareaAutosize
        className="Textarea_Basic-textarea"
        placeholder={placeholder}
        value={value || $value}
        minRows={minRows}
        maxRows={maxRows}
        onFocus={() => setFocus(true)}
        onBlur={() => {
          setFocus(false);
        }}
        style={{ width: "100%" }}
        onChange={onChangeValue}
        maxLength={maxLength}
      />
    </Textarea>
  );
}

const defaultProps = {
  className: "",
  placeholder: "Placeholder",
  status: "default",
  minRows: 5,
  maxRows: 7,
  maxLength: undefined,
  value: undefined,
  onChange: undefined,
};

Basic.defaultProps = defaultProps;

export const Textarea = styled.div`
  display: flex;
  border-bottom: solid 1px;
  width: 100%;
  background: none;
  border-color: rgba(95, 92, 93, 0.18);
  transition: 0.3s ease-in-out;
  padding: 8px 0px;
  .Textarea_Basic-textarea {
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
    color: ${Gray[700]};
    resize: none;
  }
  textarea::placeholder {
    color: rgba(95, 92, 93, 0.36);
  }
`;

export default Basic;
