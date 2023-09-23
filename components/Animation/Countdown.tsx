import { useEffect, useRef } from "react";
import styled from "@emotion/styled";
import { useLottie } from "lottie-react";
import countdownData from "../../assets/animations/countdown.json";

interface Props {
  className: string;
}

function Countdown({ className }: Props) {
  const options = {
    animationData: countdownData,
    loop: false,
  };
  const { View } = useLottie(options);

  return (
    <Animation className={`Animation_Countdown ${className}`}>{View}</Animation>
  );
}

const defaultProps = {
  className: "",
};

Countdown.defaultProps = defaultProps;

const Animation = styled.div`
  width: 200px;
  height: 200px;
  display: flex;
`;

export default Countdown;
