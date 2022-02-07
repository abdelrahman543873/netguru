export interface Repository<T> {
  add(item: T);
  addMany(items: T[]);
}
