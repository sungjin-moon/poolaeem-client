import { ReactNode } from "react";
import styled from "@emotion/styled";

import Gray from "../Color/Gray";

interface Props {
  className: string;
  type: string;
  size: number;
  children: ReactNode;
  onClick?: () => void;
}

type TypographyType = {
  [key: number]: {
    fontSize: string;
    lineHeight: string;
  };
};

const heading: TypographyType = {
  1: {
    fontSize: "48px",
    lineHeight: "72px",
  },
  2: {
    fontSize: "40px",
    lineHeight: "60px",
  },
  3: {
    fontSize: "32px",
    lineHeight: "48px",
  },
};

const subHeading: TypographyType = {
  1: {
    fontSize: "24px",
    lineHeight: "36px",
  },
  2: {
    fontSize: "20px",
    lineHeight: "30px",
  },
};

const caption: TypographyType = {
  1: {
    fontSize: "18px",
    lineHeight: "28px",
  },
  2: {
    fontSize: "16px",
    lineHeight: "24px",
  },
  3: {
    fontSize: "15px",
    lineHeight: "22px",
  },
  4: {
    fontSize: "14px",
    lineHeight: "20px",
  },
  5: {
    fontSize: "13px",
    lineHeight: "18px",
  },
  6: {
    fontSize: "12px",
    lineHeight: "18px",
  },
};

const body: TypographyType = {
  1: {
    fontSize: "18px",
    lineHeight: "28px",
  },
  2: {
    fontSize: "16px",
    lineHeight: "24px",
  },
  3: {
    fontSize: "15px",
    lineHeight: "22px",
  },
  4: {
    fontSize: "14px",
    lineHeight: "20px",
  },
  5: {
    fontSize: "13px",
    lineHeight: "18px",
  },
  6: {
    fontSize: "12px",
    lineHeight: "18px",
  },
};

function Pretendard({ className, type, size, children, onClick }: Props) {
  let Typography = Heading;

  switch (type) {
    case "heading": {
      Typography = Heading;
      break;
    }
    case "subHeading": {
      Typography = SubHeading;
      break;
    }
    case "body": {
      Typography = Body;
      break;
    }
    case "caption": {
      Typography = Caption;
      break;
    }
  }

  return (
    <Typography
      className={`Typography-Pretendard ${className}`}
      type={type}
      size={size}
      onClick={onClick}
    >
      {children}
    </Typography>
  );
}

const defaultProps = {
  className: "",
  type: "heading",
  size: 1,
};

Pretendard.defaultProps = defaultProps;

export const Heading = styled.div<Props>`
  display: flex;
  font-family: "Pretendard";
  font-weight: 600;
  color: ${Gray["700"]};
  font-size: ${({ size }) => {
    return heading[size].fontSize;
  }};
  line-height: ${({ size }) => {
    return heading[size].lineHeight;
  }};
  letter-spacing: -0.01em;
  white-space: pre-wrap;
`;

export const SubHeading = styled.div<Props>`
  display: flex;
  font-family: "Pretendard";
  font-weight: 600;
  color: ${Gray["700"]};
  font-size: ${({ size }) => {
    return subHeading[size].fontSize;
  }};
  line-height: ${({ size }) => {
    return subHeading[size].lineHeight;
  }};
  letter-spacing: -0.01em;
  white-space: pre-wrap;
`;

export const Caption = styled.div<Props>`
  display: flex;
  font-family: "Pretendard";
  font-weight: 500;
  color: ${Gray["700"]};
  font-size: ${({ size }) => {
    return caption[size].fontSize;
  }};
  line-height: ${({ size }) => {
    return caption[size].lineHeight;
  }};
  letter-spacing: -0.01em;
  white-space: pre-wrap;
`;

export const Body = styled.div<Props>`
  display: flex;
  font-family: "Pretendard";
  font-weight: 400;
  color: ${Gray["700"]};
  font-size: ${({ size }) => {
    return body[size].fontSize;
  }};
  line-height: ${({ size }) => {
    return body[size].lineHeight;
  }};
  letter-spacing: -0.01em;
  white-space: pre-wrap;
`;

export default Pretendard;
