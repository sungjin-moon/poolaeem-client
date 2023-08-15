import axios, { API } from "../settings";
import { useMutation } from "react-query";

export type UpdateImageVar = {
  file: any;
};

export type UpdateNameVar = {
  name: string;
};

const initialData = null;

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

export const updateImage = async (variables: UpdateImageVar) => {
  const url = `${API}/api/profile/image`;
  const formData = new FormData();
  variables.file && formData.append("file", variables.file);
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };

  const response = await axios.post(url, formData, config);
  const { data, status } = response;

  if (status === 200) {
    return {
      image: data?.data?.profileImageUrl || "",
    };
  }

  return initialData;
};

export const updateName = async (variables: UpdateNameVar) => {
  const url = `${API}/api/profile/name`;
  const config = {};

  const response = await axios.patch(url, { userName: variables.name }, config);
  const { data, status } = response;

  if (status === 200) {
    return {
      name: data?.data?.name || "",
    };
  }

  return initialData;
};

export function useUpdateImage(options = {}) {
  const payload = useMutation(updateImage, options);

  return payload;
}

export function useUpdateName(options = {}) {
  const payload = useMutation(updateName, options);

  return payload;
}
