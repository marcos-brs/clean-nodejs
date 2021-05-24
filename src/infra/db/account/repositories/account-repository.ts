import { BaseRepository } from '../../../../shared/infra/db/repositories/base-repository';
import { Account } from '../../../../domain/models/account';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export default interface AccountRepository extends BaseRepository<Account> {}
