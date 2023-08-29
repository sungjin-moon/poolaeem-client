import axios from "axios";
import Cookies from "universal-cookie";
import { refreshAccessToken } from "./Account/useUpdate";

export const API = "https://poolaeem.com";

const instance = axios.create({
  headers: {
    Authorization: "",
  },
});

instance.interceptors.request.use(
  (request) => {
    const cookies = new Cookies();
    const session = cookies.get("session");
    if (session?.accessToken) {
      request.headers["Authorization"] = `Bearer ${session?.accessToken}`;
    }
    return request;
  },
  (err) => {
    return Promise.reject(err);
  }
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (err) => {
    const code = err.response?.data?.code;
    if (code === 10052 || code === 10004 || code === 20000) {
      const cookies = new Cookies();
      cookies.remove("session");
      window.location.href = "/sign-in";
    }

    if (code === 10050) {
      const cookies = new Cookies();
      const session = cookies.get("session") || null;
      const payload = await refreshAccessToken(session?.refreshToken);
      cookies.set("session", { ...session, accessToken: payload?.accessToken });
      return instance(err.config);
    }
    return Promise.reject(err);
  }
);

export default instance;
