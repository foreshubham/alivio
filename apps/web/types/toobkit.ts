// apps/web/types/toolkit.ts
export type Toolkit = {
  id: string;
  name: string;
  price: number;
  image: string;
  paid?: boolean;
  deliveryDate: string | null;
};
