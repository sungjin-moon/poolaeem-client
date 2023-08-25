import axios, { API } from "../settings";
import { useMutation } from "react-query";

export type DeleteVar = {
  id: string;
};

const initialData = null;

export const deleteWorkbook = async (variables: DeleteVar) => {
  const url = `${API}/api/workbooks/${variables.id}`;
  const config = {};

  const response = await axios.delete(url, config);
  const { data, status } = response;

  if (status === 200) {
    return {};
  }

  return initialData;
};

export default function useDelete(options = {}) {
  const payload = useMutation(deleteWorkbook, options);

  return payload;
}
