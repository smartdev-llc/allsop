export class Promotion {
  constructor(parameters?: Partial<Promotion>) {
    Object.assign(this, parameters);
  }
  name?: string;
  reducedTotal?: number;
}