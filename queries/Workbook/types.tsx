export type Workbook = {
  workbookId: string;
  name: string;
  description: string;
  theme: string;
  problemCount: number;
  solvedCount: number;
  createdAt: string;
};

export type SolvedHistory = {
  resultId: string;
  userName: string;
  totalQuestions: number;
  correctCount: number;
  solvedAt: string;
};

export type ProblemOption = {
  optionId?: string;
  value: string;
  isCorrect: boolean;
};

export type Problem = {
  problemId: string;
  question: string;
  type: "CHECKBOX";
  optionCount?: number;
  timeout?: number;
  options?: ProblemOption[];
};

export interface ServerWorkbookListPayload {
  code: number;
  data: {
    hasNext: boolean;
    workbooks: Workbook[];
  };
}

export interface ServerWorkbookInfoPayload {
  code: number;
  data: {
    name: string;
    description: string;
    theme: "PINK" | "GRAY" | "BLUE" | "YELLOW" | "GREEN";
    problemCount: number;
    solvedCount: number;
  };
}

export interface ServerSolvedHistoryListPayload {
  code: number;
  data: {
    hasNext: boolean;
    results: SolvedHistory[];
  };
}

export interface ServerProblemListPayload {
  code: number;
  data: {
    hasNext: boolean;
    problems: Problem[];
  };
}

export interface ServerProblemPayload {
  code: number;
  data: Problem;
}
