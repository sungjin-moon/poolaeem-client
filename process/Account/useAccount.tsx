import { useRouter } from "next/router";
import { useEffect } from "react";

import useModal from "../../hooks/useModal";
import useStories from "../../hooks/useStories";

import { queryClient } from "../../queries";
import useRead from "../../queries/Account/useRead";

function useAccount() {
  const Router = useRouter();
  const Read = useRead();
  const Stories = useStories();

  return {
    Router,
    Read,
    Stories,
  };
}

export default useAccount;
