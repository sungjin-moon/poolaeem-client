import axios, { API } from "../settings";
import { useMutation } from "react-query";

interface Params {
  key: string;
}

interface Variables {
  state?: string;
  code?: string;
  authuser?: string;
  scope?: string;
  prompt?: string;
}

const initialData = null;
const initialParams = {
  key: "signIn",
};

export const signIn = async (variables?: Variables) => {
  const url = `${API}/login/oauth2/code/google`;
  const config = {
    withCredentials: true,
    params: variables,
  };

  const response = await axios.get(url, config);
  const { data } = response;
  console.log(response.headers);
  if (data) {
    return data;
  }

  return initialData;
};

function useAuth(params: Params = initialParams, options = {}) {
  const _params = { ...initialParams, ...params };
  const { key } = _params;

  switch (key) {
    case `signIn`: {
      return useMutation(key, signIn, options);
    }
    default:
      return useMutation("signIn", signIn, options);
  }
}

export default useAuth;
