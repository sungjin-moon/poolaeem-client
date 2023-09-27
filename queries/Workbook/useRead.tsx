import axios, { API } from "../settings";
import { useQuery } from "react-query";

import { ServerWorkbookInfoPayload } from "./types";

type Variables = {
  id: string;
};

type Info = {
  name: string;
  description: string;
  theme: "pink" | "gray" | "blue" | "yellow";
  problemCount: number;
  solvedCount: number;
};

type ClientPayload = undefined | Info;

const initialPayload: ClientPayload = undefined;

export const get = async (variables: Variables) => {
  const url = `${API}/api/workbooks/${variables.id}`;
  const config = {};

  const response = await axios.get(url, config);
  const status: number = response.status;
  const payload: ServerWorkbookInfoPayload = response.data;

  if (status === 200) {
    return {
      name: payload?.data?.name || "",
      description: payload?.data?.description || "",
      problemCount: payload?.data?.problemCount || 0,
      solvedCount: payload?.data?.solvedCount || 0,
      theme: payload?.data?.theme?.toLowerCase() || "pink",
    };
  }

  return initialPayload;
};

export function useInfo(variables: Variables = { id: "" }, options = {}) {
  const payload = useQuery(
    ["workbook-info", variables.id],
    () => get(variables),
    {
      refetchOnWindowFocus: false,
      ...options,
    }
  );

  return payload;
}
