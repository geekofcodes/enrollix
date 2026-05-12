import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(
      error.response?.data?.message || "Something went wrong"
    );
  }
);

// Enroll API
export const enrollUser = async (data) => {
  const res = await api.post("/enroll", data);
  return res.data;
};

// Get all enrollments
export const getEnrollments = async () => {
  const res = await api.get("/enrollments");
  return res.data;
};

// Export CSV
export const exportCSV = () => {
  window.open(`${import.meta.env.VITE_API_URL}/export`, "_blank");
};