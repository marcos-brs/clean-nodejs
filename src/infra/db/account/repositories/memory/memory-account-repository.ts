import { MemoryBaseRepository } from '../../../../../shared/infra/db/repositories/memory/memory-base-repository';
import { AccountRepository } from '../account-repository';
import { Account } from '../../../../../domain/models/account';

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
}
