import { ReturnModelType } from '@typegoose/typegoose';
import { FilterQuery } from 'mongoose';
import { BaseRepository } from '../base-repository';

export class MongoBaseRepository<T extends { _id: string }, G>
  implements BaseRepository<T>
{
  protected ormRepository: ReturnModelType<new () => G>;

  public async create(data: T): Promise<T> {
    const account = (await this.ormRepository.create(data)).toObject() as T;

    return account;
  }

  public async findById(id: string): Promise<T | null> {
    const account = await this.ormRepository.findById(id);

    if (account === null) return null;

    return account.toObject() as T;
  }

  public async findAll(): Promise<T[]> {
    const accounts = await this.ormRepository.find();

    return accounts.map(account => account.toObject() as T);
  }

  public async update(data: T): Promise<boolean> {
    const account = await this.ormRepository.updateOne(
      { _id: data._id } as FilterQuery<new () => G>,
      data as unknown as G
    );

    const { n, nModified, ok } = account;

    return n === nModified && nModified === ok;
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.findByIdAndDelete(id);
  }
}
