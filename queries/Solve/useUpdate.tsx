import axios, { API } from "../settings";
import { useMutation } from "react-query";

import { ProblemOption } from "./types";
import { Problem, ClientPayload } from "./useList";

export type Variables = {
  workbookId: string | string[];
  pages: ClientPayload[];
  name: string;
};

type RequestProblem = {
  problemId: string;
  answer: {
    values: {
      optionId: string;
      answer: string;
    }[];
  };
};

type RequestPayload = {
  name: string;
  problems: RequestProblem[];
};

const parseList = (pages: ClientPayload[] = []) => {
  let result: RequestProblem[] = [];

  let list: any[] = [];

  pages.forEach((page) => {
    list = list.concat(page.list);
  });

  result = list.map((problem: Problem) => {
    return {
      problemId: problem.id,
      answer: {
        values: problem.options
          .filter((option) => option.isSelected === true)
          .map((option) => {
            return {
              optionId: option.id,
              answer: option.name,
            };
          }),
      },
    };
  });

  return result;
};

const initialData = null;

export const marking = async (variables: Variables) => {
  const url = `${API}/api/workbooks/${variables.workbookId}/grade`;
  const config = {};

  const payload: RequestPayload = {
    name: variables.name,
    problems: parseList(variables.pages),
  };

  const response = await axios.post(url, payload, config);
  const { data, status } = response;

  if (status === 200) {
    return {};
  }

  return initialData;
};

export function useMarking(options = {}) {
  const payload = useMutation(marking, options);

  return payload;
}
