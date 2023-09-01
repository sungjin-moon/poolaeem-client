import { useRouter } from "next/router";
import { useEffect } from "react";

import useModal from "../../hooks/useModal";
import useToast from "../../hooks/useToast";

import { queryClient } from "../../queries";
import useRead from "../../queries/Account/useRead";

function useAccount() {
  const Router = useRouter();
  const Read = useRead();

  const Modal = useModal();
  const Toast = useToast();

  return {
    Router,
    Read,
    Modal,
    Toast,
  };
}

export default useAccount;
