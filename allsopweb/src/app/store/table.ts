export class Table<T> {
  constructor(init?: Partial<Table<T>>) {
    Object.assign(this, init);
  }
  ids: T[] = [];
  list: any = {};
}
