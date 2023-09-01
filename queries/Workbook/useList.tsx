import axios, { API } from "../settings";
import { useInfiniteQuery } from "react-query";
import moment from "moment";

import { ServerWorkbooksPayload } from "./types";

type Workbook = {
  id: string;
  name: string;
  description: string;
  problemCount: number;
  solvedCount: number;
  createdAt: string;
};

type ClientPayload = {
  total: number;
  hasNext: boolean;
  list: Workbook[];
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

export const getList = async (lastId = "") => {
  const url = `${API}/api/workbooks`;
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
  const payload: ServerWorkbooksPayload = response.data;

  if (status === 200) {
    const nextPayload: ClientPayload = {
      total: 0,
      hasNext: payload?.data?.hasNext || false,
      list:
        payload?.data?.workbooks?.map?.((workbook) => {
          return {
            id: workbook?.workbookId || "",
            name: workbook?.name || "",
            description: workbook?.description || "",
            problemCount: workbook?.problemCount || 0,
            solvedCount: workbook?.solvedCount || 0,
            createdAt:
              moment(workbook?.createdAt).format("YYYY년 MM월 DD일") || "",
          };
        }) || [],
    };
    return nextPayload;
  }

  return initialPayload;
};

export default function useList(params = {}, options = {}) {
  const payload = useInfiniteQuery(
    ["workbookList"],
    ({ pageParam }) => {
      const lastId = pageParam?.lastId || "";
      return getList(lastId);
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
