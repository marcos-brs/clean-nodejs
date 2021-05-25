import 'reflect-metadata';
import { uuid } from 'uuidv4';
import { injectable, inject } from 'tsyringe';
import { Hasher } from '../../infra/cryptography/protocols';
import { AddAccount } from '../../domain/usecases/add-account';
import { AccountRepository } from '../../infra/db/account/repositories/account-repository';

@injectable()
export class DbAddAccount implements AddAccount {
  constructor(
    @inject('Hasher')
    private hasher: Hasher,
    @inject('AccountRepository')
    private accountRepository: AccountRepository
  ) {}

  async add(account: AddAccount.Params): Promise<AddAccount.Result> {
    if (await this.accountRepository.findByEmail(account.email)) return false;

    const { name, email, password, roles } = account;
    const hashedPassword = await this.hasher.hash(password);

    await this.accountRepository.create({
      _id: uuid(),
      name,
      email,
      password: hashedPassword,
      roles,
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    });

    return true;
  }
}
