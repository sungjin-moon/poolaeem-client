import { ReactNode } from "react";
import styled from "@emotion/styled";
// import { css } from "@emotion/react";

import Edit from "../../assets/icons/Edit.svg";

import Gray from "../Color/Gray";
import Pink from "../Color/Pink";

interface Props {
  className: string;
  Icon: ReactNode;
  status: string;
  onClick: (event: object) => void;
}

function Float({ className, onClick, status, Icon }: Props) {
  return (
    <Button
      className={`Button_Float ${className}`}
      onClick={(event) => {
        event.preventDefault();
        if (status === "default") {
          onClick(event);
        }
      }}
    >
      {Icon}
    </Button>
  );
}

const defaultProps = {
  className: "",
  Icon: <Edit />,
  status: "default",
  onClick: () => {},
};

Float.defaultProps = defaultProps;

const Button = styled.button`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  outline: none;
  margin: 0px;
  padding: 10px;
  border-radius: 50%;
  border: solid 2px;
  border-color: ${Gray[50]};
  background: ${Pink[500]};
  transition: 0.3s ease-in-out;
  :hover {
    background: ${Pink[600]};
  }
  svg {
    width: 32px;
    height: 32px;
    path {
      fill: ${Gray[50]};
    }
  }
`;

export default Float;
