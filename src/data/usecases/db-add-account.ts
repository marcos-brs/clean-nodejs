import 'reflect-metadata';
import { v4 as uuidv4 } from 'uuid';
import { injectable, inject } from 'tsyringe';
import { isValidObjectId } from 'mongoose';
import { Role, RoleSchema } from '../../domain/models/role';
import { Hasher } from '../../infra/cryptography/protocols';
import { AddAccount } from '../../domain/usecases/add-account';
import { AccountRepository } from '../../infra/db/account/repositories/account-repository';
import { RoleRepository } from '../../infra/db/role/repositories/role-repository';

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

    const rolesSchema = await Promise.all(
      roles.map(async role => {
        const findRole = await this.roleRepository.findById(role);
        return findRole;
      })
    );

    if (roles.length > 0) {
      const allRolesExists = rolesSchema
        .map(role => !!role)
        .reduce(role => role);

      if (!allRolesExists) return false;
    }

    const hashedPassword = await this.hasher.hash(password);

    const mapRoles = rolesSchema.map(role => role._id);

    console.log(isValidObjectId('4f5b8281-48a1-4dd6-b765-f7bd2eeb0539'));

    console.log(roles);
    console.log(mapRoles);

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
