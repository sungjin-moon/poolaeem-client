import axios, { API } from "../settings";
import { useMutation } from "react-query";

interface Params {
  key: string;
}

interface Variables {}

const initialData = null;
const initialParams = {
  key: "",
};

const initialVariables = {};

export const refreshAccessToken = async (refreshToken: string) => {
  const url = `${API}/api/access-token/refresh`;

  const config = {
    headers: {
      Refresh: `Bearer ${refreshToken}`,
    },
  };

  const response = await axios.post(url, {}, config);
  const { status } = response;

  if (status === 200) {
    const accessToken = response.headers["access-token"] || "";
    return {
      accessToken,
    };
  }

  return initialData;
};

function useUpdate(params: Params = initialParams, options = {}) {
  const _params = { ...initialParams, ...params };
  const { key } = _params;

  // switch (key) {
  //   case `refreshAccessToken`: {
  //     return useMutation(key, refreshAccessToken, options);
  //   }
  //   default:
  //     return useMutation("refreshAccessToken", refreshAccessToken, options);
  // }
}

export default useUpdate;
