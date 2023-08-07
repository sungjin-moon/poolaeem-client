import { ReactElement } from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

import Typography from "../Typography/Pretendard";
import Gray from "../Color/Gray";
import Pink from "../Color/Pink";

import Input from "../Input/Basic";

interface Props {
  className: string;
  label: string;
  required: boolean;
  message: string;
  children: ReactElement;
}

function Basic({ className, label, required, message, children }: Props) {
  return (
    <Field className={`Field_Basic ${className}`}>
      {label && (
        <Typography
          className="Field_Basic-label"
          type="body"
          size={3}
          css={css({ color: Gray[600], fontWeight: 400 })}
        >
          {label}
          {required && <span css={css({ color: Pink[500] })}>*</span>}
        </Typography>
      )}
      {children || <Input />}
      <Typography className="Field_Basic-message" type="body" size={3}>
        {message}
      </Typography>
    </Field>
  );
}

const defaultProps = {
  className: "",
  label: "Label",
  required: true,
  message: "",
};

Basic.defaultProps = defaultProps;

export const Field = styled.div`
  .Field_Basic-label {
    span {
      margin-left: 4px;
    }
    margin-bottom: 4px;
  }
  .Field_Basic-message {
    margin-top: 4px;
    color: ${Pink[500]};
  }
`;

export default Basic;
