export type Info = {
  name: string;
  description: string;
  theme: string;
  creator: {
    name: string;
    profileImageUrl: string;
  };
  problemCount: number;
  solvedCount: number;
  createdAt: string;
};

export type ProblemOption = {
  optionId: string;
  value: string;
};

export type Problem = {
  problemId: string;
  question: string;
  type: "CHECKBOX";
  timeout: number;
  options: ProblemOption[];
};

export interface ServerInfoPayload {
  code: number;
  data: Info;
}

export interface ServerProblemListPayload {
  code: number;
  data: {
    hasNext: boolean;
    problems: Problem[];
  };
}
