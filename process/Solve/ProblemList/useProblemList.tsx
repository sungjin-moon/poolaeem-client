import { useRouter } from "next/router";
import { useState, useEffect, useRef } from "react";

import useToast from "@/hooks/useToast";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import useModal from "@/hooks/useModal";

import { queryClient } from "@/queries";
import useList from "@/queries/Solve/useList";

type SelectPayload = {
  isSelected: boolean;
  pageIndex: number;
  problemIndex: number;
  optionIndex: number;
};

function useProblemList(isOpen = false) {
  const [view, setView] = useState("ready");
  const Router = useRouter();
  const Toast = useToast();
  const CloseModal = useModal();
  const InfiniteScroll = useInfiniteScroll();
  const { onScrollBottom } = InfiniteScroll;

  const workbookId = Router?.query?.workbookId || "";

  const List = useList(
    { workbookId },
    { enabled: isOpen && workbookId && view === "problemList" ? true : false }
  );
  const ref = useRef(null);

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
      setView("ready");
    }
  }, [isOpen]);

  return {
    Router,
    View: {
      view,
      setView,
    },
    Slide: {
      ref,
    },
    Toast,
    CloseModal,
    InfiniteScroll,
    List,
    onNext,
    onSelect,
  };
}

export default useProblemList;
