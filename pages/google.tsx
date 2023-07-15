import { useEffect } from "react";

import useSignIn from "../process/SignIn/useSignIn";

function Google() {
  const { Router, onSignIn } = useSignIn();

  useEffect(() => {
    if (Router.isReady === true) {
      onSignIn();
      return;
    }
  }, [Router.isReady]);

  return <div>...Loading</div>;
}

export default Google;
