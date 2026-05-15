import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// REQUEST INTERCEPTOR
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// RESPONSE INTERCEPTOR
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error === "Invalid token" || error === "Not authorized") {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }

    return Promise.reject(
      error.response?.data?.message || "Something went wrong",
    );
  },
);

// Login API
export const loginAdmin = async (data) => {
  const res = await api.post("/auth/login", data);

  localStorage.setItem("token", res.data.token);

  return res.data;
};

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
export const exportCSV = async (data) => {
  const token = localStorage.getItem("token");

  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/export`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    }
  );

  const blob = await response.blob();
  const url = window.URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "enrollments.csv";
  a.click();
};
