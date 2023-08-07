import axios, { API } from "../settings";
import { useMutation } from "react-query";

interface Params {
  key: string;
}

interface Variables {
  userId: string;
}

const initialData = null;
const initialParams = {
  key: "deleteAccount",
};

const initialVariables = {
  userId: "",
};

export const deleteAccount = async (
  variables: Variables = initialVariables
) => {
  const url = `${API}/api/users/${variables.userId}`;

  const config = {};

  const response = await axios.delete(url, config);
  const { data } = response;

  if (response?.status === 200) {
    return {};
  }

  return initialData;
};

function useDelete(params: Params = initialParams, options = {}) {
  const _params = { ...initialParams, ...params };
  const { key } = _params;

  switch (key) {
    case `deleteAccount`: {
      return useMutation(key, deleteAccount, options);
    }
    default:
      return useMutation("deleteAccount", deleteAccount, options);
  }
}

export default useDelete;
