import { useState } from "react";
import { useRouter } from "next/router";

import useModal from "../../../hooks/useModal";
import useToast from "../../../hooks/useToast";

import { queryClient } from "../../../queries";
import useDelete from "../../../queries/Workbook/useDelete";

type Tab = {
  id?: string;
  name: string;
};

type onClose = () => void;
type onPush = () => void;

function useEdit(workbookId: string, isOpen: boolean) {
  const Router = useRouter();
  const tabs = [
    { id: "problems", name: "문항 (0)" },
    { id: "solvedHisotries", name: "풀이내역 (0)" },
    { id: "settings", name: "설정" },
  ];

  const [tab, setTab] = useState<Tab>(tabs[0]);
  const Delete = useDelete();
  const UpdateInfoModal = useModal();
  const DeleteModal = useModal();
  const CreateProblemModal = useModal();
  const Toast = useToast();

  const onDelete = (id: string = "", onClose: onClose, onPush: onPush) => {
    if (Delete.isLoading) return;
    Delete.mutate(
      { id },
      {
        onSuccess: (data) => {
          queryClient.invalidateQueries("workbookList");
          onClose();
          onPush();
        },
        onError: (error) => {},
      }
    );
  };

  const onRedirectSolve = () => Router.push(`/solve/${workbookId}`);

  return {
    Router,
    Tabs: { tab, setTab },
    Toast,
    UpdateInfoModal,
    DeleteModal,
    CreateProblemModal,
    Delete,
    onDelete,
    onRedirectSolve,
  };
}

export default useEdit;
