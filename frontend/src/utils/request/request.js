import axios from "axios";
import Cookies from "js-cookie";

let request = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,
});

request.interceptors.request.use(
  (config) => {
    if (Cookies.get("token")) {
      config.headers["Authorization"] = "Bearer " + Cookies.get("token");
    }

    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

request.interceptors.response.use(
  (response) => {
    return response;
  },

  async (error) => {
    const originalRequest = error.config;

    if (error.response.status == 401 && !originalRequest.retry) {
      originalRequest.retry = true;

      try {
        const res = await request.get("/api/refresh");
        Cookies.set("token", res.data.data.token);
        return request(originalRequest);
      } catch (error) {
        window.location.href = "/login";
        Cookies.remove("token");
      }
    }

    return Promise.reject(error);
  }
);

export default request;
