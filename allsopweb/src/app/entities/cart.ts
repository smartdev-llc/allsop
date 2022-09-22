import { Promotion } from "./promotion";

export class Cart {
  constructor(parameters?: Partial<Cart>) {
    Object.assign(this, parameters);
  }

  id?: string;
  total?: number;
  reducedTotal?: number;
  promotions?: Promotion[];
}