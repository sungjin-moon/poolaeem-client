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
  isEnd: boolean;
  number: number;
  question: string;
  type: string;
  timeout: number;
  options: Option[];
};

export type ClientProblemListPayload = {
  total: number;
  hasNext: boolean;
  list: Problem[];
};

const initialPayload: ClientProblemListPayload = {
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
  const size = 4;
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
    const hasNext = payload?.data?.hasNext || false;
    const list = payload?.data?.problems;
    const nextPayload: ClientProblemListPayload = {
      total: 0,
      hasNext,
      list:
        list?.map?.((problem, index) => {
          const number = page * size + (index + 1);
          return {
            id: problem?.problemId || "",
            isEnd: hasNext === false && list.length - 1 === index,
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
      // staleTime: 500000,
      refetchOnWindowFocus: false,
      getNextPageParam: (lastPage, allPage) => {
        const lastItem = lastPage?.list?.[lastPage.list.length - 1];

        if (lastPage.hasNext === false) {
          return undefined;
        }
        return {
          order: lastItem.number,
          page: allPage.length,
        };
      },
    }
  );

  return payload;
}
