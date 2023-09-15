import axios, { API } from "../settings";
import { useQuery } from "react-query";
import moment from "moment";

import { ServerInfoPayload } from "./types";

type Variables = {
  id: string | string[];
};

type Info = {
  id: string;
  name: string;
  description: string;
  theme: "pink" | "lightPink";
  creator: {
    name: string;
    imageUrl: string;
  };
  problemCount: number;
  solvedCount: number;
  createdAt: string;
};

type ClientPayload = undefined | Info;

const initialPayload: ClientPayload = undefined;

export const get = async (variables: Variables) => {
  const url = `${API}/api/workbooks/${variables.id}/solve/introduction`;
  const config = {};

  const response = await axios.get(url, config);
  const status: number = response.status;
  const payload: ServerInfoPayload = response.data;

  if (status === 200) {
    return {
      id: variables.id || "",
      name: payload?.data?.name || "",
      description: payload?.data?.description || "",
      creator: {
        name: payload?.data?.creator?.name || "",
        imageUrl: payload?.data?.creator?.profileImageUrl || "",
      },
      problemCount: payload?.data?.problemCount,
      solvedCount: payload?.data?.solvedCount,
      createdAt:
        moment(payload?.data?.createdAt).format("YYYY년 MM월 DD일") || "",
    };
  }

  return initialPayload;
};

export function useInfo(variables: Variables = { id: "" }, options = {}) {
  const payload = useQuery(["solve-info", variables.id], () => get(variables), {
    refetchOnWindowFocus: false,
    staleTime: 500000,
    ...options,
  });

  return payload;
}
