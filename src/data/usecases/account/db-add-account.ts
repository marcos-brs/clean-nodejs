import { injectable, inject } from 'tsyringe';
import { AddAccount } from '@/domain/usecases/account';
import { EmailAlreadyRegistered, RoleNotFound } from '@/domain/errors';
import { Hasher } from '@/infra/cryptography/protocols';
import { AccountRepository } from '@/infra/db/account/repositories';
import { RoleRepository } from '@/infra/db/role/repositories';
import { Uuid } from '@/infra/uuid/protocols';

@injectable()
export class DbAddAccount implements AddAccount {
  constructor(
    @inject('Hasher')
    private hasher: Hasher,
    @inject('Uuid')
    private uuid: Uuid,
    @inject('AccountRepository')
    private accountRepository: AccountRepository,
    @inject('RoleRepository')
    private roleRepository: RoleRepository
  ) {}

  async add(account: AddAccount.Params): Promise<AddAccount.Result> {
    if (await this.accountRepository.findByEmail(account.email)) {
      throw new EmailAlreadyRegistered();
    }

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

      if (!allRolesExists) {
        throw new RoleNotFound();
      }
    }

    const hashedPassword = await this.hasher.hash(password);

    const newAccount = await this.accountRepository.create({
      _id: this.uuid.generate(),
      name,
      email,
      password: hashedPassword,
      roles: roles as string[],
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    });

    return newAccount;
  }
}
