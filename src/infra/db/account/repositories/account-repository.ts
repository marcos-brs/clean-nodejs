import { Account } from '@/domain/models/account';
import { BaseRepository } from '@/shared/infra/db/repositories';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface AccountRepository extends BaseRepository<Account> {
  findByEmail(email: string): Promise<Account | null>;
  findAllAndPopulateStudents(
    pageIndex: number,
    pageSize: number
  ): Promise<Account[]>;
}
