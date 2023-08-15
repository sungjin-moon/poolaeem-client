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

  const ImageField = useField({
    key: "Image",
    required: true,
    status: "default",
    value: null,
    placeholder: "",
    message: "",
    maxSize: 1000000,
  });

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
    const currentSize: number = item.value.size || 0;
    const maxSize: number = item.maxSize || 0;
    if (currentSize > maxSize) {
      return Toast.onPush({
        status: "alert",
        message: "최대 1mb 이하의 이미지를 업로드 해주세요",
      });
    }

    return Update.mutate(
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
