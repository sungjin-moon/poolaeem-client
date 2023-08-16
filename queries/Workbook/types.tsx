export type Workbook = {
  workbookId: string;
  name: string;
  description: string;
  theme: string;
  problemCount: number;
  solvedCount: number;
  createdAt: string;
};

export type ServerPayload = {
  code: number;
  data: {
    hasNext: boolean;
    workbooks: Workbook[];
  };
};
