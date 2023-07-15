import axios from "axios";
import Cookies from "universal-cookie";

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
    if (session) {
      request.headers["Authorization"] = session.token;
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
  (err) => {
    if (err.response?.status === 401) {
      const cookies = new Cookies();
      cookies.remove("session");

      window.location.href = "/sign-in";
    }
    return Promise.reject(err);
  }
);

export default instance;
