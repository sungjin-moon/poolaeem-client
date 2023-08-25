import { useEffect } from "react";
import styled from "@emotion/styled";

import Spinner from "../../components/Loader/Spinner";

import useSignIn from "../../process/Account/useSignIn";

function Google() {
  const { Router, onSignIn } = useSignIn();

  useEffect(() => {
    if (Router.isReady === true) {
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
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Google;
