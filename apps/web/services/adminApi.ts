// src/services/adminApi.ts
import axios from "axios";

export const adminApi = axios.create({
  baseURL: "http://localhost:4000/api",
});

adminApi.interceptors.request.use((config) => {
  const adminToken = localStorage.getItem("admin_token");

  if (adminToken) {
    config.headers.Authorization = `Bearer ${adminToken}`;
  }

  return config;
});
