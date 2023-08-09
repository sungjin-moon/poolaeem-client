import { useRouter } from "next/router";
import { useEffect } from "react";
import Cookies from "universal-cookie";

import useToast from "../../hooks/useToast";
import useModal from "../../hooks/useModal";
import useField from "../../hooks/useField";

import { queryClient } from "../../queries";
import useRead from "../../queries/Account/useRead";
import useDelete from "../../queries/Account/useDelete";

function useSettings() {
  const Router = useRouter();
  const Read = useRead();
  const Delete = useDelete();
  const Toast = useToast();
  const Modal = useModal();

  const ImageField = useField();

  const userId = Read?.data?.userId;

  const onSignOut = () => {
    const cookies = new Cookies();
    cookies.remove("session");
    Router.replace("/sign-in");
  };

  const onDeleteAccount = () => {
    if (Delete.isLoading) return;
    Delete.mutate(
      { userId },
      {
        onSuccess: (data) => {
          if (data) {
            onSignOut();
          }
        },
        onError: (error) => {
          console.log(error);
        },
      }
    );
  };

  return {
    Router,
    Read,
    Delete,
    Toast,
    Modal,
    ImageField,
    onSignOut,
    onDeleteAccount,
  };
}

export default useSettings;
