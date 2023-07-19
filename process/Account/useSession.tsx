import { useRouter } from "next/router";
import { useEffect } from "react";

import useModal from "../../hooks/useModal";

import { queryClient } from "../../queries";
import useRead from "../../queries/Account/useRead";

function useSession() {
  const Router = useRouter();
  const Read = useRead();

  return {
    Router,
    Read,
  };
}

export default useSession;
