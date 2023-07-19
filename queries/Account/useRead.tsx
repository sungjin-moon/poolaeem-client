import axios, { API } from "../settings";
import { useQuery } from "react-query";

interface Params {
  key: string;
}

const initialData = null;
const initialParams = {
  key: "profile",
};

export const getProfile = async (params: Params = initialParams) => {
  const url = `${API}/api/profile/info`;

  const config = {};

  const response = await axios.get(url, config);
  const { data } = response;
  if (data) {
    return {
      ...data?.data,
    };
  }

  return initialData;
};

function useRead(params: Params = initialParams, options = {}) {
  const _params = { ...initialParams, ...params };
  const { key } = _params;

  const payload = useQuery(
    ["account", key],
    async () => {
      switch (key) {
        case "profile": {
          return getProfile();
        }
        default:
          return initialData;
      }
    },
    {
      // refetchOnMount: false,
      refetchOnWindowFocus: false,
      staleTime: 500000,
      ...options,
    }
  );

  return payload;
}

export default useRead;
