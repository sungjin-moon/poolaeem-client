import axios, { API } from "../../settings";
import { useMutation } from "react-query";

export type Variables = {
  id: string;
};

const initialData = null;

export const remove = async (variables: Variables) => {
  const url = `${API}/api/problems/${variables.id}`;
  const config = {};

  const response = await axios.delete(url, config);
  const { data, status } = response;

  if (status === 200) {
    return {};
  }

  return initialData;
};

export default function useDelete(options = {}) {
  const payload = useMutation(remove, options);

  return payload;
}
