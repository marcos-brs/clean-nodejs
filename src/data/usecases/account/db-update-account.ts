import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';
import { AccountNotFound, RoleNotFound } from '@/domain/errors';
import { Hasher } from '../../../infra/cryptography/protocols';
import { AccountRepository } from '../../../infra/db/account/repositories/account-repository';
import { RoleRepository } from '../../../infra/db/role/repositories/role-repository';
import { UpdateAccount } from '../../../domain/usecases';

@injectable()
export class DbUpdateAccount implements UpdateAccount {
  constructor(
    @inject('Hasher')
    private hasher: Hasher,
    @inject('AccountRepository')
    private accountRepository: AccountRepository,
    @inject('RoleRepository')
    private roleRepository: RoleRepository
  ) {}

  async update({
    id,
    ...data
  }: UpdateAccount.Params): Promise<UpdateAccount.Result> {
    const account = await this.accountRepository.findById(id);

    if (!account) {
      throw new AccountNotFound();
    }

    if (data.roles && data.roles.length > 0) {
      const rolesSchema = await Promise.all(
        data.roles.map(async role => {
          const findRole = await this.roleRepository.findById(role);
          return findRole;
        })
      );

      const allRolesExists = rolesSchema
        .map(role => !!role)
        .reduce(role => role);

      if (!allRolesExists) {
        throw new RoleNotFound();
      }
    }

    Object.assign(account, { ...data });

    if (data.password) {
      const hashedPassword = await this.hasher.hash(data.password);
      Object.assign(account, { password: hashedPassword });
    }

    this.accountRepository.update(account);

    return account;
  }
}
