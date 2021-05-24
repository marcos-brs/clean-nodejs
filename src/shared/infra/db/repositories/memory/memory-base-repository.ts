import { BaseRepository } from '../base-repository';

export class MemoryBaseRepository<T extends { _id: string }>
  implements BaseRepository<T>
{
  protected model: T[] = [];

  public async create(data: T): Promise<T> {
    this.model.push(data);

    return data;
  }

  public async findById(id: string): Promise<T | null> {
    const foundData = this.model.find(data => data._id === id);

    if (!foundData) {
      return null;
    }

    return foundData;
  }

  public async findAll(): Promise<T[]> {
    return this.model;
  }

  public async update(data: T): Promise<boolean> {
    const DataIndex = this.model.findIndex(
      DataFind => DataFind._id === data._id
    );

    this.model[DataIndex] = data;

    return DataIndex > 0;
  }

  public async delete(id: string): Promise<void> {
    this.model = this.model.filter(data => data._id !== id);
  }
}
