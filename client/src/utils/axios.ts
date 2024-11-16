import axios from "axios";
import { AXIOS_BASE_URL } from "./constants";
import refreshToken from "./refreshToken";

axios.defaults.baseURL = AXIOS_BASE_URL;

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const requestConfig = error.config;
    if (error?.response?.status === 401) {
      try {
        await refreshToken();
        return axios(requestConfig);
      } catch (error) {
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);

export default axios;
