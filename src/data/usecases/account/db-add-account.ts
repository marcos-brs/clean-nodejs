import 'reflect-metadata';
import { v4 as uuidv4 } from 'uuid';
import { injectable, inject } from 'tsyringe';
import { Hasher } from '../../../infra/cryptography/protocols';
import { AddAccount } from '../../../domain/usecases';
import { AccountRepository } from '../../../infra/db/account/repositories/account-repository';
import { RoleRepository } from '../../../infra/db/role/repositories/role-repository';

@injectable()
export class DbAddAccount implements AddAccount {
  constructor(
    @inject('Hasher')
    private hasher: Hasher,
    @inject('AccountRepository')
    private accountRepository: AccountRepository,
    @inject('RoleRepository')
    private roleRepository: RoleRepository
  ) {}

  async add(account: AddAccount.Params): Promise<AddAccount.Result> {
    if (await this.accountRepository.findByEmail(account.email)) return false;

    const { name, email, password, roles } = account;

    if (roles.length > 0) {
      const rolesSchema = await Promise.all(
        roles.map(async role => {
          const findRole = await this.roleRepository.findById(role);
          return findRole;
        })
      );

      const allRolesExists = rolesSchema
        .map(role => !!role)
        .reduce(role => role);

      if (!allRolesExists) return false;
    }

    const hashedPassword = await this.hasher.hash(password);

    await this.accountRepository.create({
      _id: uuidv4(),
      name,
      email,
      password: hashedPassword,
      roles: roles as string[],
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    });

    return true;
  }
}