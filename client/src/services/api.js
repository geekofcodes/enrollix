import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// 🔥 Enroll API
export const enrollUser = async (data) => {
  const res = await api.post("/enroll", data);
  return res.data;
};