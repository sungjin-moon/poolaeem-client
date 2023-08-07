import axios, { API } from "../settings";
import { useMutation } from "react-query";

interface Params {
  key: string;
}

interface SignInVariables {
  state?: string;
  code?: string;
  authuser?: string;
  scope?: string;
  prompt?: string;
}

interface SignOutVariables {
  code?: string;
}

const initialData = null;
const initialParams = {
  key: "signIn",
};

export const signIn = async (variables?: SignInVariables) => {
  const url = `${API}/login/oauth2/code/google`;
  const config = {
    withCredentials: true,
    params: variables,
  };

  const response = await axios.get(url, config);
  const { data } = response;

  if (data) {
    const accessToken = response.headers["access-token"] || "";
    const refreshToken = response.headers["refresh-token"] || "";
    return {
      code: data?.code,
      accessToken,
      refreshToken,
      query: {
        ...data?.data,
      },
    };
  }

  return initialData;
};

export const signOut = async (variables?: SignOutVariables) => {
  const url = `${API}/api/sign-out`;
  const config = {};

  const response = await axios.post(url, {}, config);
  const { data } = response;

  if (data) {
    return {
      code: data?.code,
    };
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
    // case `signOut`: {
    //   return useMutation("signOut", signOut, options);
    // }
    default:
      return useMutation("signIn", signIn, options);
  }
}

export default useAuth;
