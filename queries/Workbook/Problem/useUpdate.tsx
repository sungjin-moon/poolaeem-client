import axios, { API } from "../../settings";
import { useMutation } from "react-query";

import { ProblemOption } from "../types";

type Option = {
  id?: string;
  name: string;
  theme: "pink" | "lightPink";
};

export type Variables = {
  id: string;
  question: string;
  type: "CHECKBOX";
  options: Option[];
};

const initialData = null;

export const update = async (variables: Variables) => {
  const url = `${API}/api/problems/${variables.id}`;
  const config = {};

  const body = {
    question: variables.question,
    type: variables.type,
    options: variables.options.map((option) => {
      const result: ProblemOption = {
        value: option.name,
        isCorrect:
          option.theme === "pink"
            ? true
            : option.theme === "lightPink"
            ? false
            : false,
      };
      if (option.id) {
        result.optionId = option.id;
      }
      return result;
    }),
  };

  const response = await axios.put(url, body, config);
  const { data, status } = response;

  if (status === 200) {
    return {
      name: data?.data?.name || "",
      description: data?.data?.description || "",
    };
  }

  return initialData;
};

export function useUpdateInfo(options = {}) {
  const payload = useMutation(update, options);

  return payload;
}
