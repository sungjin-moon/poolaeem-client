import axios, { API } from "../settings";
import { useInfiniteQuery } from "react-query";

import { ServerProblemListPayload } from "./types";

export type Option = {
  id: string;
  name: string;
  isSelected: boolean;
};

export type Problem = {
  id: string;
  number: number;
  question: string;
  type: string;
  timeout: number;
  options: Option[];
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
  workbookId: string | string[];
}

export const getList = async (
  workbookId: string | string[] = "",
  order = "",
  page = 1
) => {
  const url = `${API}/api/workbooks/${workbookId}/problems/solve`;
  const size = 10;
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
            timeout: problem?.timeout || 0,
            options: problem?.options?.map?.((option) => {
              return {
                id: option?.optionId || "",
                name: option?.value || "",
                isSelected: false,
              };
            }),
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
    ["solve-problemList", params.workbookId],
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
        const list = lastPage?.list;

        if (lastPage.hasNext === false) {
          return undefined;
        }
        return {
          order: list.length,
          page: allPage.length,
        };
      },
    }
  );

  return payload;
}
