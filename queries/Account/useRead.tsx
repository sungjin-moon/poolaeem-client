import axios, { API } from "../settings";
import { useQuery } from "react-query";

type Variables = {};

type Profile = {
  id: string;
  name: string;
  email: string;
  image: string;
};

const initialPayload: Profile = {
  id: "",
  name: "",
  email: "",
  image: "",
};

export const getProfile = async (variables: Variables) => {
  const url = `${API}/api/profile/info`;

  const config = {};

  const response = await axios.get(url, config);
  const { data } = response;
  if (data) {
    const payload: Profile = {
      id: data?.data?.userId || "",
      name: data?.data?.name || "",
      email: data?.data?.email || "",
      image: data?.data?.profileImageUrl || "",
    };

    return payload;
  }

  return initialPayload;
};

export function useProfile(variables: Variables = {}, options = {}) {
  const payload = useQuery(["account-profile"], () => getProfile(variables), {
    // refetchOnMount: false,
    refetchOnWindowFocus: false,
    staleTime: 500000,
    ...options,
  });

  return payload;
}
