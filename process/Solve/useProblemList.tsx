import { useRouter } from "next/router";
import { useEffect, useState, useRef } from "react";

import useToast from "../../hooks/useToast";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";
import useModal from "../../hooks/useModal";

import { queryClient } from "../../queries";
import useList from "../../queries/Solve/useList";
import { useMarking } from "../../queries/Solve/useUpdate";

type SelectPayload = {
  isSelected: boolean;
  pageIndex: number;
  problemIndex: number;
  optionIndex: number;
};

function useProblemList(isOpen = false) {
  const Router = useRouter();
  const Toast = useToast();
  const CloseModal = useModal();
  const InfiniteScroll = useInfiniteScroll();
  const { onScrollBottom } = InfiniteScroll;

  const workbookId = Router?.query?.workbookId || "";

  const List = useList(
    { workbookId },
    { enabled: isOpen && workbookId ? true : false }
  );
  const Marking = useMarking();
  const ref = useRef(null);
  const [isEnd, setEnd] = useState(false);

  const onNext = () => {
    const el: any = ref?.current;
    if (el) {
      el?.swiper?.slideNext?.();
    }
  };

  const onSelect = (payload: SelectPayload) => {
    queryClient.setQueriesData(
      ["solve-problemList", workbookId],
      (queryData: any) => {
        const { pageIndex, problemIndex, optionIndex } = payload;
        const selectedOption =
          queryData.pages[pageIndex].list[problemIndex].options[optionIndex];
        selectedOption.isSelected = !selectedOption.isSelected;
        return queryData;
      }
    );
  };

  const onMarking = (name: string) => {
    if (Marking.isLoading) return;
    const pages = List.data?.pages || [];
    Marking.mutate(
      { workbookId, pages, name },
      {
        onSuccess: () => {},
        onError: () => {},
      }
    );
  };

  const onInit = () => {
    setEnd(false);
    Marking.reset();
    queryClient.invalidateQueries(["solve-problemList"]);
  };

  const onCreateWorkbook = () => {
    Router.push("/?modal=create");
  };

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

  useEffect(() => {
    if (isOpen === false) {
      queryClient.invalidateQueries(["solve-problemList"]);
    }
  }, [isOpen]);

  return {
    isEnd,
    setEnd,
    Router,
    Slide: {
      ref,
    },
    Toast,
    CloseModal,
    InfiniteScroll,
    List,
    Marking,
    onNext,
    onSelect,
    onMarking,
    onInit,
    onCreateWorkbook,
  };
}

export default useProblemList;
