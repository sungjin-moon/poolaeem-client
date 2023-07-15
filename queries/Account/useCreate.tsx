import axios, { API } from "../settings";
import { useMutation } from "react-query";

interface Params {
  key: string;
}

export interface Variables {
  isAgreeTerms?: boolean;
  oauthProvider: string;
  oauthId: string;
  email: string;
}

const initialData = null;
const initialParams = {
  key: "signUp",
};

const initialVariables = {
  isAgreeTerms: true,
  oauthProvider: "GOOGLE",
  oauthId: "",
  email: "",
};

export const signUp = async (variables: Variables = initialVariables) => {
  const url = `${API}/api/signup/terms`;

  const config = {};

  const response = await axios.post(url, variables, config);
  const { data } = response;
  console.log(response);
  if (data) {
    return data;
  }

  if (response.status !== 200) {
    throw new Error(`Response status is "${response.status}"`);
  }

  return initialData;
};

function useCreate(params: Params = initialParams, options = {}) {
  const _params = { ...initialParams, ...params };
  const { key } = _params;

  switch (key) {
    case `signUp`: {
      return useMutation(key, signUp, options);
    }
    default:
      return useMutation("signUp", signUp, options);
  }
}

export default useCreate;
