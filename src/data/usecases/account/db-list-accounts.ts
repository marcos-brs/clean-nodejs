import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';
import { ListAccounts } from '@/domain/usecases/account';
import { AccountRepository } from '@/infra/db/account/repositories/account-repository';

@injectable()
export class DbListAccounts implements ListAccounts {
  constructor(
    @inject('AccountRepository')
    private accountRepository: AccountRepository
  ) {}

  async list(): Promise<ListAccounts.Result> {
    return this.accountRepository.findAll();
  }
}
