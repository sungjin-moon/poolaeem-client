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
  console.log(variables);
  const config = {
    withCredentials: true,
    params: variables,
  };

  const response = await axios.get(url, config);
  const { data } = response;
  console.log(data);
  if (data) {
    return data;
  }

  return initialData;
};

function useAuth(params: Params = initialParams, options = {}) {
  const _params = { ...initialParams, ...params };
  const { key } = _params;
  const payload = useMutation(async (variables?: Variables) => {
    switch (key) {
      case `signIn`: {
        return signIn(variables);
      }
      default:
        return initialData;
    }
  }, options);

  return payload;
}

export default useAuth;
