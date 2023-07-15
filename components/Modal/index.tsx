import styled from "@emotion/styled";
import { RefObject, ReactElement } from "react";

import useModal from "../../hooks/useModal";

interface Props {
  className: string;
  children: ReactElement;
  hooks: {
    Modal: {
      ref: RefObject<HTMLInputElement>;
      isOpen: boolean;
      status: string;
      onFadeIn: () => void;
      onFadeOut: () => void;
      onOpen: () => void;
      onClose: () => void;
    };
  };
}

function Background({ className, children, hooks }: Props) {
  const { ref, isOpen, status, onClose } = hooks.Modal || useModal();
  return (
    <Modal
      className={`Modal ${className}`}
      onClick={(event) => {
        event.preventDefault();
        if (event.target !== event.currentTarget) {
          return;
        }
        onClose();
      }}
      ref={ref}
      css={{
        height: isOpen === true ? "100%" : "0%",
        opacity: status === "fadeIn" ? "1" : "0",
      }}
    >
      {children}
    </Modal>
  );
}

const defaultProps = {
  className: "",
  children: null,
  hooks: {
    Modal: null,
  },
};

Background.defaultProps = defaultProps;

export const Modal = styled.div`
  position: absolute;
  left: 0px;
  right: 0px;
  top: 0px;
  width: 100%;
  height: 100%;
  z-index: 500;
  background: rgba(46, 44, 44, 0.64);
  display: flex;
  transition: opacity 0.3s ease-in-out;
`;

export default Background;
