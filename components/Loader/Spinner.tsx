import styled from "@emotion/styled";

import Gray from "../Color/Gray";

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
  border: 4px solid ${Gray[400]};
  border-top: 4px solid ${Gray[500]};
  border-radius: 50%;
  width: 40px;
  height: 40px;
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
