import axios from "axios";
import { AXIOS_BASE_URL } from "./constants";

axios.defaults.baseURL = AXIOS_BASE_URL;

export default axios;
