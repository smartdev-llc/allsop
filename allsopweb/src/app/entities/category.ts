export class Category {
  constructor(parameters?: Partial<Category>) {
    Object.assign(this, parameters);
  }

  id?: string;
  name?: string;
}