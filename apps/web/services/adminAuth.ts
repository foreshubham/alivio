import { adminApi } from "./adminApi";

export const adminLogin = async (email: string, password: string) => {
  const res = await adminApi.post("/admin/auth/login", {
    email,
    password,
  });

  return res.data;
};
