
import axios from "axios";

const axiosClient = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api/v1`,
  timeout: 120000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

(async () => {
  try {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token) {
        axiosClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      }
    }
  } catch (error) {
    console.error("Error fetching token from AsyncStorage:", error);
  }
})();



export default axiosClient;
