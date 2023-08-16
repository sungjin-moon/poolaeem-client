import axios, { API } from "../settings";
import { useInfiniteQuery } from "react-query";
import moment from "moment";

import { ServerPayload } from "./types";

type Workbook = {
  id: string;
  name: string;
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

export const getList = async (page: number = 1) => {
  const url = `${API}/api/workbooks`;
  const config = {
    params: {
      size: 10,
      page,
    },
  };

  const response = await axios.get(url, config);
  const status: number = response.status;
  const payload: ServerPayload = response.data;

  if (status === 200) {
    console.log(payload);
    const nextPayload: ClientPayload = {
      total: 0,
      hasNext: payload?.data?.hasNext || false,
      list:
        payload?.data?.workbooks?.map?.((workbook) => {
          return {
            id: workbook?.workbookId || "",
            name: workbook?.name || "",
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
    ({ pageParam }) => getList(pageParam),
    {
      ...options,
      // refetchOnMount: false,
      refetchOnWindowFocus: false,
      staleTime: 500000,
      getNextPageParam: (lastPage, allPage) => {
        if (lastPage.hasNext === false) {
          return undefined;
        }
        return allPage.length + 1;
      },
    }
  );

  return payload;
}
