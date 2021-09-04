import { Account } from '@/domain/models/account';
import { MemoryBaseRepository } from '@/shared/infra/db/repositories';
import { AccountRepository } from './account-repository';

export class MemoryAccountRepository
  extends MemoryBaseRepository<Account>
  implements AccountRepository
{
  constructor() {
    super();
  }

  public async findByEmail(email: string): Promise<Account | null> {
    const foundData = this.model.find(data => data.email === email);

    if (!foundData) {
      return null;
    }

    return foundData;
  }

  public async findAllAndPopulateStudents(
    pageIndex: number,
    pageSize: number
  ): Promise<Account[]> {
    return this.model;
  }

  public async findStudentByEmail(email: string): Promise<Account | null> {
    const foundData = this.model.find(data => data.email === email);

    if (!foundData) {
      return null;
    }

    return foundData;
  }
}
