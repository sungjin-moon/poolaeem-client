import axios, { API } from "../../settings";
import { useMutation } from "react-query";

type Option = {
  id?: string;
  name: string;
  theme: "pink" | "lightPink";
};

export type Variables = {
  workbookId: string;
  question: string;
  type: "CHECKBOX";
  options: Option[];
};

const initialData = null;

export const create = async (variables: Variables) => {
  const url = `${API}/api/workbooks/${variables.workbookId}/problem`;
  const config = {};

  const body = {
    question: variables.question,
    type: variables.type,
    options: variables.options.map((option) => {
      return {
        value: option.name,
        isCorrect:
          option.theme === "pink"
            ? true
            : option.theme === "lightPink"
            ? false
            : false,
      };
    }),
  };

  const response = await axios.post(url, body, config);
  const { data, status } = response;

  if (status === 200) {
    return {};
  }

  return initialData;
};

export default function useCreate(options = {}) {
  const payload = useMutation(create, options);

  return payload;
}
