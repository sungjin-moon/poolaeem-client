import axios, { API } from "../settings";
import { useMutation } from "react-query";

import { ProblemOption } from "./types";
import { Problem, ClientProblemListPayload } from "./useList";

export type Variables = {
  workbookId: string | string[];
  pages: ClientProblemListPayload[];
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

type ReqPayload = {
  name: string;
  problems: RequestProblem[];
};

type ResPayload = {
  code: number;
  data: {
    name: string;
    totalProblems: number;
    correctCount: number;
    accuracyRate: number;
  };
};

type Data = {
  name: string;
  solvedCount: number;
  correctedCount: number;
  accuracyRate: number;
};

type Marking = (variables: Variables) => Promise<Data>;

const parseList = (pages: ClientProblemListPayload[] = []) => {
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

const initialData: Data = {
  name: "",
  solvedCount: 0,
  correctedCount: 0,
  accuracyRate: 0,
};

export const marking: Marking = async (variables) => {
  const url = `${API}/api/workbooks/${variables.workbookId}/grade`;
  const config = {};

  const reqPayload: ReqPayload = {
    name: variables.name,
    problems: parseList(variables.pages),
  };

  const response = await axios.post(url, reqPayload, config);
  const status: number = response.status;
  const resPayload: ResPayload = response.data;

  if (status === 200) {
    return {
      name: resPayload?.data?.name || "",
      solvedCount: resPayload?.data?.totalProblems,
      correctedCount: resPayload?.data?.correctCount,
      accuracyRate: resPayload?.data?.accuracyRate || 0,
    };
  }

  return initialData;
};

export function useMarking(options = {}) {
  const payload = useMutation(marking, options);

  return payload;
}
