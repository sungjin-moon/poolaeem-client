import axios, { API } from "../../settings";
import { useQuery } from "react-query";

import { ServerProblemPayload } from "../types";

type Variables = {
  id: string;
};

type Option = {
  id?: string;
  name: string;
  theme: "pink" | "lightPink";
};

type Problem = {
  id: string;
  question: string;
  type: "CHECKBOX";
  options: Option[];
};

type ClientPayload = undefined | Problem;

const initialPayload: ClientPayload = undefined;

export const get = async (variables: Variables) => {
  const url = `${API}/api/problems/${variables.id}`;
  const config = {};

  const response = await axios.get(url, config);
  const status: number = response.status;
  const payload: ServerProblemPayload = response.data;

  if (status === 200) {
    return {
      id: payload?.data?.problemId || "",
      question: payload?.data?.question || "",
      type: payload?.data?.type || "",
      options:
        payload?.data?.options?.map?.((option) => {
          return {
            id: option?.optionId || "",
            name: option?.value || "",
            theme:
              option?.isCorrect === true
                ? "pink"
                : option.isCorrect === false
                ? "lightPink"
                : "lightPink",
          };
        }) || [],
    };
  }

  return initialPayload;
};

export default function useRead(
  variables: Variables = { id: "" },
  options = {}
) {
  const payload = useQuery(["problem", variables.id], () => get(variables), {
    refetchOnWindowFocus: false,
    staleTime: 500000,
    ...options,
  });

  return payload;
}
