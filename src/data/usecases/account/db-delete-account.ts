import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';
import { DeleteAccount } from '@/domain/usecases/account';
import { AccountNotFound } from '@/domain/errors';
import { AccountRepository } from '@/infra/db/account/repositories/account-repository';

@injectable()
export class DbDeleteAccount implements DeleteAccount {
  constructor(
    @inject('AccountRepository')
    private accountRepository: AccountRepository
  ) {}

  async delete({ id }: DeleteAccount.Params): Promise<DeleteAccount.Result> {
    const account = await this.accountRepository.findById(id);

    if (!account) {
      throw new AccountNotFound();
    }

    await this.accountRepository.delete(id);

    return true;
  }
}
