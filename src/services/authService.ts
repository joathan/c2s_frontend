import axios from "axios";

const API_URL = "http://localhost:3100/api/v1";

export const login = async (email: string, password: string) => {
  const response = await axios.post(`${API_URL}/login`, { email, password }, { withCredentials: true });
  return response.data;
};
