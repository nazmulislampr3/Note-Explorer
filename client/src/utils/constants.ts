export const AXIOS_BASE_URL =
  import.meta.env.VITE_NODE_ENV === "development"
    ? "http://localhost:5000/api/v1"
    : import.meta.env.VITE_AXIOS_BASE_URL;
