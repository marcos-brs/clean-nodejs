import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';
import { AccountRepository } from '../../infra/db/account/repositories/account-repository';
import { DeleteAccount } from '../../domain/usecases';

@injectable()
export class DbDeleteAccount implements DeleteAccount {
  constructor(
    @inject('AccountRepository')
    private accountRepository: AccountRepository
  ) {}

  async delete({ id }: DeleteAccount.Params): Promise<DeleteAccount.Result> {
    const account = await this.accountRepository.findById(id);

    if (!account) return false;

    this.accountRepository.delete(id);

    return true;
  }
}
