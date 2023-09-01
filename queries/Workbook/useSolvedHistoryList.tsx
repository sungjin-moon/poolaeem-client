import axios, { API } from "../settings";
import { useInfiniteQuery } from "react-query";
import moment from "moment";

import { ServerSolvedHistoryListPayload } from "./types";

export type SolvedHistory = {
  id: string;
  userName: string;
  questionCount: number;
  correctCount: number;
  solvedAt: string;
};

export type ClientPayload = {
  total: number;
  hasNext: boolean;
  list: SolvedHistory[];
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
  const url = `${API}/api/results/workbooks/${workbookId}/solved/histories`;
  const config: Config = {
    params: {
      size: 10,
    },
  };

  if (lastId) {
    config.params.lastId = lastId;
  }

  const response = await axios.get(url, config);
  const status: number = response.status;
  const payload: ServerSolvedHistoryListPayload = response.data;

  if (status === 200) {
    const nextPayload: ClientPayload = {
      total: 0,
      hasNext: payload?.data?.hasNext || false,
      list:
        payload?.data?.results?.map?.((solvedHistory) => {
          return {
            id: solvedHistory?.resultId || "",
            userName: solvedHistory?.userName || "",
            questionCount: solvedHistory?.totalQuestions || 0,
            correctCount: solvedHistory?.correctCount || 0,
            solvedAt:
              moment(solvedHistory?.solvedAt).format("YYYY년 MM월 DD일") || "",
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
    ["solvedHistoryList", params.workbookId],
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
