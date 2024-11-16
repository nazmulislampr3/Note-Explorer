import axios from "axios";

const refreshToken = async () => {
  try {
    await axios.get("/auth/token/refresh");
  } catch (error) {
    throw error;
  }
};

export default refreshToken;
