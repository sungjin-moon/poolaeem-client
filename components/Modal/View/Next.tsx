import styled from "@emotion/styled";
import { RefObject, ReactElement } from "react";
import { css } from "@emotion/react";

import LeftArrow from "../../../assets/icons/LeftArrow.svg";

import Background from "../index";
import Gray from "../../Color/Gray";
import Typography from "../../Typography/Pretendard";

interface Props {
  className: string;
  animateType: string;
  modalRef: RefObject<HTMLInputElement>;
  children?: ReactElement;
  isOpen: boolean;
  status: string;
  onClose: () => void;
}

interface HeaderProps {
  className?: string;
  title?: string;
  action?: {
    name: string;
    handler: () => void;
  };
  onClose?: (data: undefined) => void;
}

export const Header = ({
  className,
  title = "Title",
  action = {
    name: "Name",
    handler: () => {},
  },
  onClose = () => {},
}: HeaderProps) => {
  return (
    <HeaderBox className={`HeaderBox ${className}`}>
      <LeftArrow
        className="HeaderBox-close"
        onClick={() => onClose(undefined)}
      />
      <Typography className="HeaderBox-title" type="caption" size={1}>
        {title}
      </Typography>
      {action && (
        <Typography
          className="HeaderBox-action"
          type="caption"
          size={3}
          onClick={action.handler}
        >
          {action.name}
        </Typography>
      )}
    </HeaderBox>
  );
};

function Next({
  className,
  animateType,
  modalRef,
  children,
  isOpen,
  status,
  onClose,
}: Props) {
  const animate = () => {
    if (animateType === "bottomToTop") {
      return status === "fadeIn" ? "translateY(0px)" : "translateY(1000px)";
    }
    return status === "fadeIn" ? "translateX(0px)" : "translateX(800px)";
  };

  return (
    <Background
      modalRef={modalRef}
      isOpen={isOpen}
      status={status}
      onClose={onClose}
    >
      <Container
        className={`Modal_Next ${className}`}
        css={css({
          transform: animate(),
        })}
      >
        {children}
      </Container>
    </Background>
  );
}

const defaultProps = {
  className: "",
  animateType: "rightToLeft",
  modalRef: null,
  isOpen: false,
  status: "init",
  onClose: () => {},
};

Next.defaultProps = defaultProps;

export const Container = styled.div`
  width: 100%;
  height: 100%;
  background: ${Gray[50]};
  transition: 0.3s ease-in-out;
  display: flex;
  flex-direction: column;
`;

const HeaderBox = styled.header`
  min-height: 48px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 8px;
  .HeaderBox-close {
    cursor: pointer;
  }
  .HeaderBox-action {
    cursor: pointer;
    padding-right: 12px;
  }
`;

export default Next;
