import { useEffect } from "react";
import styled from "@emotion/styled";

import Gray from "../..//components/Color/Gray";
import Spinner from "../../components/Loader/Spinner";

import useSignIn from "../../process/Account/useSignIn";

function Google() {
  const { Router, onSignIn } = useSignIn();

  useEffect(() => {
    if (Router.isReady) {
      onSignIn();
      return;
    }
  }, [Router.isReady]);

  return (
    <Template>
      <Spinner />
    </Template>
  );
}

const Template = styled.div`
  background: ${Gray[50]};
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Google;
