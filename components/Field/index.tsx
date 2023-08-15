import { ReactElement } from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

import WarningSign from "../../assets/icons/$WarningSign.svg";

import Typography from "../Typography/Pretendard";
import Gray from "../Color/Gray";
import Pink from "../Color/Pink";

import Input from "../Input/Basic";

interface Props {
  className: string;
  label: string;
  required: boolean;
  message: string;
  currentLength?: undefined | number;
  maxLength?: undefined | number;
  children: ReactElement;
}

function Basic({
  className,
  label,
  required,
  message,
  currentLength,
  maxLength,
  children,
}: Props) {
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
      <div className="Field_Basic-bottom">
        {message && (
          <Message>
            <div className="Message-wrapper">
              <WarningSign className="Message-icon" />
            </div>
            <Typography className="Message-text" type="body" size={3}>
              {message}
            </Typography>
          </Message>
        )}
        {maxLength && (
          <MaxSize>
            <Typography className="MaxSize-text" type="body" size={3}>
              {`${currentLength}/${maxLength}`}
            </Typography>
          </MaxSize>
        )}
      </div>
    </Field>
  );
}

const defaultProps = {
  className: "",
  label: "Label",
  required: true,
  message: "",
  maxLength: undefined,
  currentLength: undefined,
};

Basic.defaultProps = defaultProps;

export const Field = styled.div`
  .Field_Basic-label {
    span {
      margin-left: 4px;
    }
    margin-bottom: 4px;
  }
  .Field_Basic-bottom {
    display: flex;
  }
`;

const Message = styled.div`
  margin-top: 4px;
  display: flex;
  align-items: center;
  .Message-wrapper {
    display: flex;
  }
  .Message-icon {
    width: 20px;
    height: 20px;
    margin-right: 4px;
  }
  .Message-text {
    color: ${Pink[500]};
  }
`;

const MaxSize = styled.div`
  margin-top: 4px;
  margin-left: auto;
  .MaxSize-text {
    color: rgba(95, 92, 93, 0.36);
  }
`;

export default Basic;
