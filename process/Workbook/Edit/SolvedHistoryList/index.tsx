import { useEffect } from "react";

import useInfiniteScroll from "../../../../hooks/useInfiniteScroll";

// import { queryClient } from "../../../../queries";
import useList from "../../../../queries/Workbook/useSolvedHistoryList";

function SolvedHistoryList(workbookId: string) {
  const List = useList({ workbookId });
  const InfiniteScroll = useInfiniteScroll();
  const { onScrollBottom } = InfiniteScroll;

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
    InfiniteScroll,
    List,
  };
}

export default SolvedHistoryList;
