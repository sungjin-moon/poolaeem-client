import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import useModal from "../../../hooks/useModal";
import useToast from "../../../hooks/useToast";

import { queryClient } from "../../../queries";
import useDelete from "../../../queries/Workbook/useDelete";
import { useInfo } from "../../../queries/Workbook/useRead";

type onClose = () => void;
type onPush = () => void;

function useEdit(workbookId: string, isOpen: boolean) {
  const Router = useRouter();
  const [tab, setTab] = useState("problemList");
  const Delete = useDelete();
  const Info = useInfo(
    { id: workbookId },
    { enabled: workbookId && isOpen ? true : false }
  );
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
          queryClient.invalidateQueries(["problemList", workbookId]);
          queryClient.invalidateQueries("workbookList");
          queryClient.invalidateQueries(["workbook-info", workbookId]);
          onClose();
          onPush();
        },
        onError: (error) => {},
      }
    );
  };

  const onRedirectSolve = () => Router.push(`/solve/${workbookId}`);

  useEffect(() => {
    if (isOpen === false) {
      Toast.onClear();
      setTab("problemList");
      return;
    }
  }, [isOpen]);

  return {
    Router,
    Tabs: { tab, setTab },
    Toast,
    UpdateInfoModal,
    DeleteModal,
    CreateProblemModal,
    Info,
    Delete,
    onDelete,
    onRedirectSolve,
  };
}

export default useEdit;
