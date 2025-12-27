import { adminApi } from "@/services/adminApi";

export const getAllPartners = async () => {
  const res = await adminApi.get("/admin/partners");
  return res.data;
};
