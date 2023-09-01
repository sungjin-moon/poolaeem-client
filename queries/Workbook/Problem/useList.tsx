import axios, { API } from "../../settings";
import { useInfiniteQuery } from "react-query";

import { ServerProblemPayload } from "../types";

export type Problem = {
  id: string;
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
    lastId?: string;
  };
};

type Params = {
  workbookId: string;
};

export const getList = async (workbookId = "", lastId = "") => {
  const url = `${API}/api/workbooks/${workbookId}/problems`;
  const config: Config = {
    params: {
      size: 5,
    },
  };

  if (lastId) {
    config.params.lastId = lastId;
  }

  const response = await axios.get(url, config);
  const status: number = response.status;
  const payload: ServerProblemPayload = response.data;

  if (status === 200) {
    const nextPayload: ClientPayload = {
      total: 0,
      hasNext: payload?.data?.hasNext || false,
      list:
        payload?.data?.problems?.map?.((problem) => {
          return {
            id: problem?.problemId || "",
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
      const lastId = pageParam?.lastId || "";
      return getList(params.workbookId, lastId);
    },
    {
      ...options,
      // refetchOnMount: false,
      refetchOnWindowFocus: false,
      staleTime: 500000,
      getNextPageParam: (lastPage, allPage) => {
        const list = lastPage?.list;
        const lastItem = list?.[list?.length - 1];
        const lastId = lastItem?.id || "";

        if (lastPage.hasNext === false) {
          return undefined;
        }
        return {
          lastId,
        };
      },
    }
  );

  return payload;
}
