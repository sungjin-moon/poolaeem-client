import styled from "@emotion/styled";
import { RefObject, ReactElement } from "react";
import { css } from "@emotion/react";

import WarningSign from "../../../assets/icons/$WarningSign.svg";

import useModal from "../../../hooks/useModal";

import Background from "../index";
import Gray from "../../Color/Gray";
import Typography from "../../Typography/Pretendard";
import SolidButton from "../../Button/Solid";

interface Props {
  className: string;
  Icon: ReactElement;
  title: string;
  description: string;
  modalRef: RefObject<HTMLInputElement>;
  isOpen: boolean;
  status: string;
  onFadeIn: () => void;
  onFadeOut: () => void;
  onOpen: () => void;
  onClose: () => void;
  cancel: {
    placeholder: string;
    status?: string;
    handler: () => void;
  };
  success: {
    placeholder: string;
    status?: string;
    handler: () => void;
  };
}

function Confirm({
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
}: Props) {
  return (
    <Background
      modalRef={modalRef}
      isOpen={isOpen}
      status={status}
      onClose={onClose}
    >
      <Container
        className={`Modal_Confirm ${className}`}
        css={css({
          transform:
            status === "fadeIn" ? "translateY(0px)" : "translateY(1000px)",
        })}
      >
        {Icon}
        <Typography className="Modal_Confirm-title" type="subHeading" size={1}>
          {title}
        </Typography>
        <Typography className="Modal_Confirm-description" type="body" size={3}>
          {description}
        </Typography>
        <div className="Modal_Confirm-buttons">
          <SolidButton
            className="Modal_Confirm-buttons-button cancel"
            size="large"
            theme="lightPink"
            placeholder={cancel.placeholder}
            status={cancel.status}
            onClick={cancel.handler}
          />
          <SolidButton
            className="Modal_Confirm-buttons-button success"
            size="large"
            theme="pink"
            placeholder={success.placeholder}
            status={success.status}
            onClick={success.handler}
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
  description:
    "Lorem ipsum dolor sit amet consectetur. Amet tincidunt eget sapien netus lorem.",
  modalRef: null,
  isOpen: false,
  status: "init",
  onFadeIn: () => {},
  onFadeOut: () => {},
  onOpen: () => {},
  onClose: () => {},
  hooks: {
    Modal: null,
  },
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
};

Confirm.defaultProps = defaultProps;

export const Container = styled.div`
  width: 100%;
  margin-top: auto;
  background: ${Gray[50]};
  transition: 0.3s ease-in-out;
  border-radius: 24px 24px 0px 0px;
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  svg {
    width: 64px;
    height: 64px;
  }
  .Modal_Confirm-title {
    margin: 4px 0px;
  }
  .Modal_Confirm-title,
  .Modal_Confirm-description {
    color: ${Gray[700]};
    text-align: center;
  }
  .Modal_Confirm-buttons {
    display: flex;
    width: 100%;
    margin-top: 24px;
    .Modal_Confirm-buttons-button {
      width: 100%;
      margin-right: 8px;
      :last-child {
        margin-right: 0px;
      }
    }
  }
`;

export default Confirm;
