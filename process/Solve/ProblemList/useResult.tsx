import { useRouter } from "next/router";

// import { queryClient } from "@/queries";
import { useMarking } from "@/queries/Solve/useUpdate";

function useResult(isOpen = false) {
  const Router = useRouter();

  const workbookId = Router?.query?.workbookId || "";
  const Marking = useMarking();

  const onMarking = (name: string, pages: any = []) => {
    if (Marking.isLoading) return;
    Marking.mutate(
      { workbookId, pages, name },
      {
        onSuccess: () => {},
        onError: () => {},
      }
    );
  };

  const onInit = (onReset: () => void = () => {}) => {
    onReset();
    Marking.reset();
  };

  const onCreateWorkbook = () => {
    Router.push("/?modal=create");
  };

  return {
    Router,
    Marking,
    onMarking,
    onInit,
    onCreateWorkbook,
  };
}

export default useResult;
