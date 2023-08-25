import axios, { API } from "../settings";
import { useMutation } from "react-query";

export type UpdateInfoVar = {
  id: string;
  name: string;
  description: string;
};

const initialData = null;

export const updateInfo = async (variables: UpdateInfoVar) => {
  const url = `${API}/api/workbooks/${variables.id}`;
  const config = {};

  const response = await axios.put(
    url,
    { name: variables.name, description: variables.description },
    config
  );
  const { data, status } = response;

  if (status === 200) {
    return {
      name: data?.data?.name || "",
      description: data?.data?.description || "",
    };
  }

  return initialData;
};

export function useUpdateInfo(options = {}) {
  const payload = useMutation(updateInfo, options);

  return payload;
}
