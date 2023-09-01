import { ReactNode } from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

import CrossMark from "../../assets/icons/CrossMark.svg";

import Typography from "../Typography/Pretendard";
import Gray from "../Color/Gray";
import Pink from "../Color/Pink";
import Blue from "../Color/Blue";
import Yellow from "../Color/Yellow";
import Green from "../Color/Green";

interface Props {
  className: string;
  name: string;
  theme: string;
  isClose: boolean;
  onClick: () => void;
  onClose: () => void;
}

type themeType = {
  [key: string]: {
    background: string;
    color: string;
  };
};

const chipTheme: themeType = {
  pink: {
    background: Pink[500],
    color: Pink[50],
  },
  lightPink: {
    background: Pink[50],
    color: Pink[500],
  },
  yellow: {
    background: Yellow[500],
    color: Gray[700],
  },
  lightYellow: {
    background: Yellow[50],
    color: Gray[700],
  },
  blue: {
    background: Blue[500],
    color: Blue[50],
  },
  lightBlue: {
    background: Blue[50],
    color: Blue[500],
  },
  green: {
    background: Green[500],
    color: Gray[700],
  },
  lightGreen: {
    background: Pink[50],
    color: Gray[700],
  },
  white: {
    background: Gray[50],
    color: Gray[700],
  },
  black: {
    background: Gray[800],
    color: Gray[50],
  },
};

function Solid({ className, name, theme, isClose, onClick, onClose }: Props) {
  let _theme = chipTheme[theme] || chipTheme["pink"];

  return (
    <Chip
      className={`Chip_Basic ${className}`}
      css={css({
        background: _theme.background,
      })}
      onClick={onClick}
    >
      <Typography
        className="Chip_Basic-name"
        type="body"
        size={6}
        css={css({
          color: _theme.color,
        })}
      >
        {name}
      </Typography>
      {isClose && (
        <CrossMark
          className="Chip_Basic-close"
          css={css({
            path: {
              fill: _theme.color,
            },
          })}
          onClick={onClose}
        />
      )}
    </Chip>
  );
}

const defaultProps = {
  className: "",
  name: "Name",
  theme: "pink",
  isClose: false,
  onClick: () => {},
  onClose: () => {},
};

Solid.defaultProps = defaultProps;

export const Chip = styled.div`
  display: inline-flex;
  align-items: center;
  border-radius: 8px;
  padding: 6px 8px;
  .Chip_Basic-name {
  }

  .Chip_Basic-close {
    cursor: pointer;
    width: 18px;
    height: 18px;
  }
`;

export default Solid;
