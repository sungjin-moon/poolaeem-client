import styled from "@emotion/styled";

import Pink from "../Color/Pink";

interface Props {
  className: string;
}

function Loader({ className }: Props) {
  return <Spinner className={`Loader_Spinner ${className}`} />;
}

const defaultProps = {
  className: "",
};

Loader.defaultProps = defaultProps;

export const Spinner = styled.div`
  border: 2px solid ${Pink[400]};
  border-top: 2px solid ${Pink[100]};
  border-radius: 50%;
  width: 36px;
  height: 36px;
  animation: spin 1s linear infinite;
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export default Loader;
