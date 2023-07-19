import { useRouter } from "next/router";
import { useEffect } from "react";

import useModal from "../../hooks/useModal";

import { queryClient } from "../../queries";
import { API } from "../../queries/settings";
import useAuth from "../../queries/Account/useAuth";
import useCreate from "../../queries/Account/useCreate";

function useAccount() {
  const Router = useRouter();
  const { push, query } = Router;

  return {
    Router,
  };
}

export default useAccount;
