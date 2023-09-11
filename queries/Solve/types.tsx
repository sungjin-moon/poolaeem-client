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

export interface ServerInfoPayload {
  code: number;
  data: Info;
}
