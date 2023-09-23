import axios, { API } from "../../settings";
import { useInfiniteQuery } from "react-query";

import { ServerProblemListPayload } from "../types";

export type Problem = {
  id: string;
  number: number;
  question: string;
  type: string;
  optionCount: number;
  timeout: number;
};

export type ClientPayload = {
  total: number;
  hasNext: boolean;
  list: Problem[];
};

const initialPayload: ClientPayload = {
  total: 0,
  hasNext: false,
  list: [],
};

type Config = {
  params: {
    size: number;
    order?: string;
  };
};

interface Params {
  workbookId: string;
}

export const getList = async (workbookId = "", order = "", page = 1) => {
  const url = `${API}/api/workbooks/${workbookId}/problems`;
  const size = 7;
  const config: Config = {
    params: {
      size,
    },
  };

  if (order) {
    config.params.order = order;
  }

  const response = await axios.get(url, config);
  const status: number = response.status;
  const payload: ServerProblemListPayload = response.data;

  if (status === 200) {
    const nextPayload: ClientPayload = {
      total: 0,
      hasNext: payload?.data?.hasNext || false,
      list:
        payload?.data?.problems?.map?.((problem, index) => {
          const number = page * size + (index + 1);
          return {
            id: problem?.problemId || "",
            number,
            question: problem?.question || "",
            type: problem?.type || "",
            optionCount: problem?.optionCount || 0,
            timeout: problem?.timeout || 0,
          };
        }) || [],
    };
    return nextPayload;
  }

  return initialPayload;
};

export default function useList(
  params: Params = { workbookId: "" },
  options = {}
) {
  const payload = useInfiniteQuery(
    ["problemList", params.workbookId],
    ({ pageParam }) => {
      const workbookId = params?.workbookId || "";
      const order = pageParam?.order || "";
      const page = pageParam?.page || "";
      return getList(workbookId, order, page);
    },
    {
      ...options,
      // refetchOnMount: false,
      refetchOnWindowFocus: false,
      staleTime: 500000,
      getNextPageParam: (lastPage, allPage) => {
        if (lastPage.hasNext === false) {
          return undefined;
        }
        return {
          order: allPage.length,
          page: allPage.length,
        };
      },
    }
  );

  return payload;
}
