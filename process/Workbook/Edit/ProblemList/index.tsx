import { useState } from "react";

import useModal from "../../../../hooks/useModal";
import useToast from "../../../../hooks/useToast";

import { queryClient } from "../../../../queries";
import useDelete from "../../../../queries/Workbook/Problem/useDelete";
import useList from "../../../../queries/Workbook/Problem/useList";

function useProblemList(workbookId: string) {
  const Delete = useDelete();
  const List = useList({ workbookId });
  const UpdateModal = useModal();
  const DeleteModal = useModal();
  const CreateModal = useModal();
  const Toast = useToast();

  const onDelete = () => {
    if (Delete.isLoading) return;
    const problem = DeleteModal.data;
    Delete.mutate(
      { id: problem.id },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(["problemList", workbookId]);
          queryClient.invalidateQueries("workbookList");
          DeleteModal.onClose();
          Toast.onPush({
            status: "success",
            message: "문항이 삭제되었어요",
          });
        },
        onError: (error) => {},
      }
    );
  };

  return {
    Toast,
    CreateModal,
    DeleteModal,
    UpdateModal,
    Delete,
    List,
    onDelete,
  };
}

export default useProblemList;
