import styled from "@emotion/styled";
import { RefObject, ReactElement, useEffect } from "react";
import { css } from "@emotion/react";

import WarningSign from "../../../assets/icons/$WarningSign.svg";

import Background from "../index";
import Gray from "../../Color/Gray";
import Typography from "../../Typography/Pretendard";
import SolidButton from "../../Button/Solid";
import SingleTextField from "../../Field/SingleText";

import useField from "../../../hooks/useField";

type Field = {
  key?: string;
  required?: boolean;
  status?: string;
  value?: string;
  placeholder?: string;
  message?: string;
  maxLength?: number;
};

interface Props {
  className: string;
  Icon: ReactElement;
  title: string;
  description: string;
  modalRef: RefObject<HTMLInputElement>;
  isOpen: boolean;
  status: string;
  onClose: () => void;
  cancel: {
    placeholder: string;
    status?: string;
    handler: () => void;
  };
  success: {
    placeholder: string;
    status?: string;
    handler: (field: Field) => void;
  };
  field: Field;
}

const initialField = {
  key: "name",
  required: true,
  status: "default",
  value: "",
  placeholder: "Placeholder",
  message: "",
  maxLength: 100,
};

function Prompt({
  className,
  Icon,
  title,
  description,
  modalRef,
  isOpen,
  status,
  onClose,
  cancel,
  success,
  field,
}: Props) {
  const Field = useField({ ...initialField, ...field });

  useEffect(() => {
    if (isOpen === false) {
      Field.setValue("");
    }
  }, [isOpen]);

  return (
    <Background
      modalRef={modalRef}
      isOpen={isOpen}
      status={status}
      onClose={onClose}
    >
      <Container
        className={`Modal_Prompt ${className}`}
        css={css({
          transform:
            status === "fadeIn" ? "translateY(0px)" : "translateY(1000px)",
          WebkitTransform:
            status === "fadeIn" ? "translateY(0px)" : "translateY(1000px)",
          willChange: status === "fadeIn" ? "transform" : "auto",
        })}
      >
        {Icon}
        <Typography className="Modal_Prompt-title" type="subHeading" size={1}>
          {title}
        </Typography>
        {description && (
          <Typography className="Modal_Prompt-description" type="body" size={3}>
            {description}
          </Typography>
        )}
        <SingleTextField
          className="Modal_Prompt-field"
          label=""
          item={Field.item}
          onChange={Field.onChange}
        />
        <div className="Modal_Prompt-buttons">
          <SolidButton
            className="Modal_Prompt-buttons-button cancel"
            size="large"
            theme="lightPink"
            placeholder={cancel.placeholder}
            status={cancel.status}
            onClick={cancel.handler}
          />
          <SolidButton
            className="Modal_Prompt-buttons-button success"
            size="large"
            theme="pink"
            placeholder={success.placeholder}
            status={success.status}
            onClick={() => {
              const isSuccess = Field.onCheckValue();
              if (isSuccess === true) {
                return success.handler(Field.item);
              }
            }}
          />
        </div>
      </Container>
    </Background>
  );
}

const defaultProps = {
  className: "",
  Icon: <WarningSign />,
  title: "Title",
  description: "",
  modalRef: null,
  isOpen: false,
  status: "init",
  onClose: () => {},
  cancel: {
    placeholder: "Placeholder",
    status: "default",
    handler: () => {},
  },
  success: {
    placeholder: "Placeholder",
    status: "default",
    handler: () => {},
  },
  field: {
    key: "name",
    required: true,
    status: "default",
    value: "",
    placeholder: "Placeholder",
    message: "",
    maxLength: 100,
  },
};

Prompt.defaultProps = defaultProps;

export const Container = styled.div`
  width: 100%;
  margin-top: auto;
  background: ${Gray[50]};
  transition: transform 0.3s ease-in-out;
  border-radius: 24px 24px 0px 0px;
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  svg {
    width: 64px;
    height: 64px;
  }
  .Modal_Prompt-title {
    margin: 4px 0px;
  }
  .Modal_Prompt-title,
  .Modal_Prompt-description {
    color: ${Gray[700]};
    text-align: center;
  }
  .Modal_Prompt-field {
    width: 100%;
  }
  .Modal_Prompt-buttons {
    display: flex;
    width: 100%;
    margin-top: 24px;
    .Modal_Prompt-buttons-button {
      width: 100%;
      margin-right: 8px;
      :last-child {
        margin-right: 0px;
      }
    }
  }
`;

export default Prompt;
