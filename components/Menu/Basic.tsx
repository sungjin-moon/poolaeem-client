import { ReactElement } from "react";
import styled from "@emotion/styled";

import Add from "../../assets/icons/Add.svg";

import Gray from "../Color/Gray";
import Pink from "../Color/Pink";
import Typography from "../Typography/Pretendard";

interface Props {
  className: string;
  name: string;
  onClick: () => void;
  Icon: ReactElement;
}

function Basic({ className, name, onClick, Icon }: Props) {
  return (
    <Menu className={`Menu_Basic ${className}`} onClick={onClick}>
      <Typography className="Menu_Basic-name" type="caption" size={3}>
        {name}
      </Typography>
      {Icon}
    </Menu>
  );
}

const defaultProps = {
  className: "",
  name: "Name",
  onClick: () => {},
  Icon: <Add />,
};

Basic.defaultProps = defaultProps;

export const Menu = styled.div`
  cursor: pointer;
  border-radius: 12px;
  background: ${Pink[400]};
  padding: 8px 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: 0.3s ease-in-out;
  .Menu_Basic-name {
    color: ${Gray[50]};
  }
  svg {
    path {
      fill: ${Gray[50]};
    }
  }
  @media (min-width: 960px) {
    :hover {
      background: ${Pink[300]};
    }
  }
`;

export default Basic;
