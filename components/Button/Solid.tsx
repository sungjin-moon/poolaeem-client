import { ReactNode } from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

import Typography from "../Typography/Pretendard";
import Gray from "../Color/Gray";
import Pink from "../Color/Pink";
import Spinner from "../Loader/Spinner";

interface Props {
  className: string;
  size: string;
  placeholder: string;
  theme: string;
  status: string;
  Icon: ReactNode;
  onClick: (event: object) => void;
}

type buttonSizeType = {
  [key: string]: {
    typoSize: number;
    height: string;
    padding: string;
    borderRadius: string;
  };
};

const buttonSize: buttonSizeType = {
  small: {
    typoSize: 4,
    height: "32px",
    padding: "0px 8px",
    borderRadius: "8px",
  },
  medium: {
    typoSize: 3,
    height: "40px",
    padding: "0px 10px",
    borderRadius: "10px",
  },
  large: {
    typoSize: 3,
    height: "48px",
    padding: "0px 12px",
    borderRadius: "12px",
  },
};

type buttonStatusType = {
  [key: string]: {
    background: string;
    color: string;
    hover: {
      background: string;
    };
  };
};

const buttonTheme: buttonStatusType = {
  pink: {
    background: Pink[500],
    color: Pink[50],
    hover: {
      background: Pink[600],
    },
  },
  lightPink: {
    background: Pink[50],
    color: Pink[500],
    hover: {
      background: Pink[100],
    },
  },
  white: {
    background: Gray[50],
    color: Gray[600],
    hover: {
      background: Gray[100],
    },
  },
};

function Solid({
  className,
  size,
  theme,
  placeholder,
  status,
  onClick,
  Icon,
}: Props) {
  let _size = buttonSize[size] || buttonSize[1];
  let _theme = buttonTheme[theme] || buttonTheme["pink"];

  return (
    <Button
      className={`Button_Solid ${className}`}
      css={css({
        height: _size.height,
        padding: _size.padding,
        borderRadius: _size.borderRadius,
        background: _theme.background,
        ":hover": {
          background:
            status === "disabled" ? _theme.background : _theme.hover.background,
        },
        opacity: status === "disabled" ? 0.4 : 1,
        cursor: status === "disabled" ? "auto" : "pointer",
      })}
      onClick={(event) => {
        event.preventDefault();
        if (status === "default") {
          onClick(event);
        }
      }}
    >
      {status === "loading" ? (
        <Spinner className="Button_Solid-spinner" />
      ) : (
        <>
          {Icon}
          <Typography
            className="Button_Solid-placeholder"
            type="caption"
            size={_size.typoSize}
            css={css({
              color: _theme.color,
            })}
          >
            {placeholder}
          </Typography>
        </>
      )}
    </Button>
  );
}

const defaultProps = {
  className: "",
  size: "medium",
  placeholder: "Placeholder",
  theme: "pink",
  status: "default",
  Icon: null,
  onClick: () => {},
};

Solid.defaultProps = defaultProps;

export const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  outline: none;
  margin: 0px;
  padding: 0px 16px;
  height: 48px;
  border-radius: 12px;
  cursor: pointer;
  gap: 4px;
  transition: 0.3s ease-in-out;
  svg {
    width: 24px;
    height: 24px;
    margin-right: 6px;
    path {
      fill: ${Pink[50]};
    }
  }
  .Button_Solid-spinner {
    width: 32px;
    height: 32px;
    border: 4px solid ${Gray[400]};
    border-top: 4px solid ${Gray[50]};
  }
  .Button_Solid-placeholder {
  }
`;

export default Solid;
