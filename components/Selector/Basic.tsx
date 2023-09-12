import styled from "@emotion/styled";

import RadioButtonOff from "../../assets/icons/RadioButtonOff.svg";
import RadioButtonOn from "../../assets/icons/RadioButtonOn.svg";

import Gray from "../Color/Gray";
import Pink from "../Color/Pink";
import Typography from "../Typography/Pretendard";
import { useState } from "react";

interface Props {
  className: string;
  name: string;
  value: undefined | boolean;
  onChange: (value: boolean) => void;
}

function Basic({ className, name, value, onChange }: Props) {
  const [selected, setSelected] = useState(false);
  const _isSelected = value || selected;

  return (
    <Selector
      className={`Selector_Basic ${className}`}
      isSelected={_isSelected}
      onClick={() => {
        if (value !== undefined) {
          return onChange(!_isSelected);
        }
        return setSelected(!_isSelected);
      }}
    >
      {_isSelected ? (
        <RadioButtonOn className="Selector_Basic-on" />
      ) : (
        <RadioButtonOff className="Selector_Basic-off" />
      )}

      <Typography className="Selector_Basic-name" type="caption" size={3}>
        {name}
      </Typography>
    </Selector>
  );
}

const defaultProps = {
  className: "",
  name: "Name",
  value: undefined,
  onChange: () => {},
};

Basic.defaultProps = defaultProps;

type SelectorType = {
  isSelected: boolean;
};

export const Selector = styled.div`
  cursor: pointer;
  border-radius: 12px;
  background: ${({ isSelected }: SelectorType) => {
    return isSelected ? Pink[50] : Pink[400];
  }};
  padding: 8px 12px;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: 0.3s ease-in-out;
  .Selector_Basic-name {
    color: ${({ isSelected }: SelectorType) => {
      return isSelected ? Pink[500] : Gray[50];
    }};
    transition: 0.3s ease-in-out;
  }
  svg {
    path {
      fill: ${({ isSelected }: SelectorType) => {
        return isSelected ? Pink[500] : Gray[50];
      }};
      transition: 0.3s ease-in-out;
    }
  }
  @media (min-width: 960px) {
    :hover {
      background: ${({ isSelected }: SelectorType) => {
        return isSelected ? Gray[50] : Pink[300];
      }};
    }
  }
`;

export default Basic;
