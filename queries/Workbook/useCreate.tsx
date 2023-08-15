import axios, { API } from "../settings";
import { useMutation } from "react-query";

export type Variables = {
  name: string;
  description: string;
};

const initialData = null;

export const create = async (variables: Variables) => {
  const url = `${API}/api/workbook`;
  const config = {};

  const response = await axios.post(url, variables, config);
  const { data, status } = response;

  if (status === 200) {
    return {
      id: data?.data?.workbookId || "",
    };
  }

  return initialData;
};

export default function useCreate(options = {}) {
  const payload = useMutation(create, options);

  return payload;
}
