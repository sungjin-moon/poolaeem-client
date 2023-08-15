import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";

import useToast from "../../hooks/useToast";
import useModal from "../../hooks/useModal";
import useField, { Item } from "../../hooks/useField";

import { queryClient } from "../../queries";
import useRead from "../../queries/Account/useRead";
import useDelete from "../../queries/Account/useDelete";
import { useUpdateImage } from "../../queries/Account/useUpdate";

function useSettings() {
  const Router = useRouter();
  const Read = useRead();
  const Update = useUpdateImage();
  const Delete = useDelete();
  const Toast = useToast();
  const DeleteAccountModal = useModal();
  const ChangeNameModal = useModal();

  const ImageField = useField();

  const userId = Read?.data?.id;

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

  const onChangeImage = (item: Item) => {
    if (Update.isLoading) return;

    Update.mutate(
      { file: item.value.file },
      {
        onSuccess: (data) => {
          queryClient.setQueryData(["account", "profile"], {
            ...Read.data,
            ...data,
          });
          Toast.onPush({
            status: "success",
            message: "내 정보가 변경되었어요",
          });
        },
        onError: (error) => {},
      }
    );
  };

  useEffect(() => {
    const nextValue = { ...ImageField.item.value, src: Read.data?.image };
    ImageField.setValue(nextValue);
  }, [Read.data?.image]);

  return {
    Router,
    Read,
    Delete,
    Toast,
    DeleteAccountModal,
    ChangeNameModal,
    ImageField,
    onChangeImage,
    onSignOut,
    onDeleteAccount,
  };
}

export default useSettings;
