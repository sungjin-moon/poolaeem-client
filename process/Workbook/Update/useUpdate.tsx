import { useState } from "react";

import useModal from "../../../hooks/useModal";
import useToast from "../../../hooks/useToast";

import { queryClient } from "../../../queries";
import useDelete from "../../../queries/Workbook/useDelete";
import useSolvedHistoryList from "../../../queries/Workbook/useSolvedHistoryList";

type Tab = {
  id?: string;
  name: string;
};

type onClose = () => void;
type onPush = () => void;

function useUpdateWorkbook(workbookId: string) {
  const tabs = [
    { id: "0", name: "문항 (0)" },
    { id: "solvedHisotries", name: "풀이내역 (0)" },
    { id: "settings", name: "설정" },
  ];

  const [tab, setTab] = useState<Tab>(tabs[0]);
  const Delete = useDelete();
  const SolvedHistoryList = useSolvedHistoryList(
    { workbookId },
    { enabled: tab.id === "solvedHisotries" }
  );
  const UpdateInfoModal = useModal();
  const DeleteModal = useModal();
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

  return {
    Tabs: { tabs, tab, setTab },
    Toast,
    UpdateInfoModal,
    DeleteModal,
    Delete,
    SolvedHistoryList,
    onDelete,
  };
}

export default useUpdateWorkbook;
