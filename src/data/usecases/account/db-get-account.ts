import { injectable, inject } from 'tsyringe';
import { AccountNotFound } from '@/domain/errors';
import { AccountRepository } from '@/infra/db/account/repositories';
import { GetAccount } from '@/domain/usecases/account';

@injectable()
export class DbGetAccount implements GetAccount {
  constructor(
    @inject('AccountRepository')
    private accountRepository: AccountRepository
  ) {}

  async get(data: GetAccount.Params): Promise<GetAccount.Result> {
    const { email } = data;

    const account = await this.accountRepository.findByEmail(email);
    if (!account) {
      throw new AccountNotFound();
    }

    return account;
  }
}
