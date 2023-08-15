import { ReactNode } from "react";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";

import Meagaphone from "../../assets/icons/$Meagphone.svg";
import WarningSign from "../../assets/icons/$WarningSign.svg";
import CheckSign from "../../assets/icons/$CheckSign.svg";

import Gray from "../Color/Gray";
import Typography from "../Typography/Pretendard";

interface BoxProps {
  className: string;
  message: string;
  status: string;
}

function Box({ className, message, status }: BoxProps) {
  type StatusTypes = {
    [key: string]: {
      Icon: ReactNode;
    };
  };

  const statusTypes: StatusTypes = {
    noti: {
      Icon: <Meagaphone className="Toast-icon" />,
    },
    alert: {
      Icon: <WarningSign className="Toast-icon" />,
    },
    success: {
      Icon: <CheckSign className="Toast-icon" />,
    },
  };

  let _status = statusTypes[status];

  return (
    <ToastBox className={`Toast ${className}`}>
      {_status.Icon}
      <Typography className="Toast-message" type="body" size={4}>
        {message}
      </Typography>
    </ToastBox>
  );
}

Box.defaultProps = {
  className: "",
  message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  status: "noti",
};

interface Props {
  className: string;
  list: Array<Toast>;
}

type Toast = {
  message: string;
  status: string;
};

function Toast({ className, list }: Props) {
  return (
    <Container className={`Toast ${className}`}>
      {list.map((toast, index) => {
        return (
          <div className="effect" key={index}>
            <Box message={toast.message} status={toast.status} />
          </div>
        );
      })}
    </Container>
  );
}

Toast.defaultProps = {
  className: "",
  list: [],
};

const Animate = keyframes`
  0% { opacity: 0; height: 0; margin-bottom: 0px; }
  10% { opacity: 1; height: 40px;  margin-bottom: 8px;}
  20% { opacity: 1; height: 40px;  margin-bottom: 8px;}
  30% { opacity: 1; height: 40px; margin-bottom: 8px;}
  40% { opacity: 1; height: 40px;  margin-bottom: 8px;}
  50% { opacity: 1; height: 40px; margin-bottom: 8px;}
  60% { opacity: 1; height: 40px; margin-bottom: 8px;}
  70% { opacity: 1; height: 40px; margin-bottom: 8px;}
  80% { opacity: 1; height: 40px; margin-bottom: 8px;}
  90% { opacity: 1; height: 40px; margin-bottom: 8px;}
 100% { opacity: 0; height: 0;margin-bottom: 0px;}
`;

const Container = styled.div`
  position: fixed;
  left: 0px;
  right: 0px;
  margin-bottom: 4%;
  bottom: 0px;
  z-index: 99;
  max-height: 224px;
  overflow-y: hidden;
  ::-webkit-scrollbar {
    display: none;
  }
  .effect {
    display: flex;
    justify-content: center;
    opacity: 0;
    height: 0;
    margin-bottom: 0px;
    animation-duration: 4s;
    animation-name: ${Animate};
  }
`;

const ToastBox = styled.div`
  display: flex;
  border-radius: 12px;
  padding: 0px 16px;
  align-items: center;
  transition: all 0.3s ease-in-out;
  background: ${Gray[800]};
  .Toast-icon {
    width: 20px;
    height: 20px;
  }
  .success {
  }
  .invalid {
  }
  .Toast-message {
    margin-left: 6px;
    color: ${Gray[50]};
    font-weight: 400;
  }
`;

export default Toast;
