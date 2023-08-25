import { useEffect } from "react";

import useModal from "../../hooks/useModal";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";
import useToast from "../../hooks/useToast";

import { queryClient } from "../../queries";
import useList from "../../queries/Workbook/useList";

function useWorkbookList() {
  const CreateModal = useModal();
  const UpdateModal = useModal();
  const InfiniteScroll = useInfiniteScroll();
  const Toast = useToast();

  const { onScrollBottom } = InfiniteScroll;

  const List = useList();

  useEffect(() => {
    if (
      List.status === "success" &&
      List.isFetching === false &&
      (List.hasNextPage === true || List.hasNextPage === undefined)
    ) {
      return onScrollBottom(() => {
        List.fetchNextPage();
      });
    }
  }, [List.isFetched, List.isFetching, List.hasNextPage]);

  return {
    CreateModal,
    UpdateModal,
    List,
    InfiniteScroll,
    Toast,
  };
}

export default useWorkbookList;
