import { SetStateAction, useEffect, useState, Dispatch } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import styled from "@emotion/styled";

import Gray from "../../components/Color/Gray";
import Pink from "../../components/Color/Pink";

import useInterval from "../../hooks/useInterval";

type Props = {
  className: string;
  value: number;
  maxValue: number;
  timeout: number;
  count?: number;
  setCount?: Dispatch<SetStateAction<number>>;
  onChange: (count: number) => boolean;
};

export const useCount = () => {
  const [count, setCount] = useState(0);

  return {
    count,
    setCount,
  };
};

function Circular({
  className,
  value,
  maxValue,
  timeout,
  onChange,
  count,
  setCount,
}: Props) {
  const [$count, $setCount] = useState<number>(0);

  let _count = $count;
  let _setCount = $setCount;

  if (count) {
    _count = count;
  }

  if (setCount) {
    _setCount = setCount;
  }

  useInterval(() => {
    if (_count < value) {
      const nextCount = _count + 1;
      _setCount(nextCount);
    }
  }, timeout);

  useEffect(() => {
    const isReset = onChange(_count);
    if (isReset) {
      _setCount(0);
    }
  }, [_count]);

  useEffect(() => {
    return () => _setCount(0);
  }, []);

  return (
    <ProgressBar className={`ProgressBar_Circular ${className}`}>
      <CircularProgressbar
        className="ProgressBar_Circular-loader"
        strokeWidth={6}
        value={_count}
        maxValue={maxValue}
        text={`${_count}`}
        styles={buildStyles({
          textColor: Gray[50],
          trailColor: Pink[400],
          pathColor: Gray[50],
          strokeLinecap: "butt",
          textSize: "40px",
        })}
      />
    </ProgressBar>
  );
}

const defaultProps = {
  className: "",
  value: 10,
  maxValue: 70,
  timeout: 30,
  onChange: () => false,
};

Circular.defaultProps = defaultProps;

const ProgressBar = styled.div`
  width: 120px;
  height: 120px;
  .ProgressBar_Circular-loader {
    width: 100%;
    height: 100%;
    .CircularProgressbar-text {
      font-weight: 600;
    }
  }
`;

export default Circular;
