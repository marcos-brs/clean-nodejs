export interface BaseRepository<T> {
  create(data: T): Promise<T>;
  findById(id: string): Promise<T | null>;
  findAll(): Promise<T[]>;
  update(data: T): Promise<boolean>;
  delete(id: string): Promise<void>;
}
