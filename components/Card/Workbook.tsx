import { ReactElement } from "react";
import styled from "@emotion/styled";

import RightArrow from "../../assets/icons/RightArrow.svg";

import Gray from "../Color/Gray";
import Pink from "../Color/Pink";
import Chip from "../Chip/Basic";
import Typography from "../Typography/Pretendard";

interface Props {
  className: string;
  name: string;
  createdAt: string;
  problemCount: number;
  solvedCount: number;
  ScrollView: ReactElement;
  onClick: (event: object) => void;
}

function Workbook({
  className,
  name,
  createdAt,
  problemCount,
  solvedCount,
  ScrollView,
  onClick,
}: Props) {
  return (
    <Card
      className={`Card_Comic ${className}`}
      onClick={(event) => {
        event.preventDefault();
        onClick(event);
        return;
      }}
    >
      {ScrollView}
      <Typography className="WorkBookCard-name" type="subHeading" size={1}>
        {name}
      </Typography>
      <Typography className="WorkBookCard-date" type="body" size={5}>
        {createdAt}
      </Typography>
      <div className="WorkBookCard-bottom">
        <Chip
          className="WorkBookCard-bottom-chip"
          theme="lightPink"
          name={`${problemCount} 문항`}
        />
        <Chip
          className="WorkBookCard-bottom-chip"
          theme="lightPink"
          name={`${solvedCount}먕 풀이`}
        />
        <RightArrow className="WorkBookCard-bottom-icon" />
      </div>
    </Card>
  );
}

const defaultProps = {
  className: "",
  name: "Name",
  createdAt: "0000년 00월 00일",
  problemCount: 0,
  solvedCount: 0,
  ScrollView: null,
  onClick: () => {},
};

Workbook.defaultProps = defaultProps;

export const Card = styled.div`
  padding: 20px;
  border-radius: 20px;
  background: ${Pink[500]};
  margin-bottom: 8px;
  :last-child {
    margin-bottom: 0px;
  }
  .WorkBookCard-name {
    color: ${Gray[50]};
  }
  .WorkBookCard-date {
    color: ${Gray[50]};
  }
  .WorkBookCard-bottom {
    margin-top: 40px;
    display: flex;
    align-items: center;
    .WorkBookCard-bottom-chip {
      margin-right: 4px;
    }
    .WorkBookCard-bottom-icon {
      margin-left: auto;
      path {
        fill: ${Gray[50]};
      }
    }
  }
`;

export default Workbook;
