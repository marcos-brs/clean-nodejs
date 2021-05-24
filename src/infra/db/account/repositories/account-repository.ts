import { BaseRepository } from '../../../../shared/infra/db/repositories/base-repository';
import { Account } from '../../../../domain/models/account';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface AccountRepository extends BaseRepository<Account> {
  findByEmail(email: string): Promise<Account | null>;
}
