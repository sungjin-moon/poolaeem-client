import { useState } from "react";
import useField from "../../../hooks/useField";

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

function useUpdateWorkbook() {
  const Delete = useDelete();
  const UpdateInfoModal = useModal();
  const DeleteModal = useModal();
  const Toast = useToast();

  const tabs = [
    { id: "0", name: "문항 (0)" },
    { id: "1", name: "풀이내역 (0)" },
    { id: "settings", name: "설정" },
  ];

  const [tab, setTab] = useState<Tab>(tabs[2]);

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

  return {
    Tabs: { tabs, tab, setTab },
    Toast,
    UpdateInfoModal,
    DeleteModal,
    Delete,
    onDelete,
  };
}

export default useUpdateWorkbook;
