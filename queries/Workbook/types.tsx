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

export type Problem = {
  problemId: string;
  question: string;
  type: string;
  optionCount: number;
  timeout: number;
};

export type ServerWorkbooksPayload = {
  code: number;
  data: {
    hasNext: boolean;
    workbooks: Workbook[];
  };
};

export type ServerSolvedHistoriesPayload = {
  code: number;
  data: {
    hasNext: boolean;
    results: SolvedHistory[];
  };
};

export type ServerProblemPayload = {
  code: number;
  data: {
    hasNext: boolean;
    problems: Problem[];
  };
};
