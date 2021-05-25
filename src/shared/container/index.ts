import { container } from 'tsyringe';
import { JwtAdapter } from '../../infra/cryptography/adapters/jwt-adapter';
import { Encrypter, Hasher } from '../../infra/cryptography/protocols';
import { BcryptAdapter } from '../../infra/cryptography/adapters';
import { RoleRepository } from '../../infra/db/role/repositories/role-repository';
import { MongoRoleRepository } from '../../infra/db/role/repositories/mongo/mongo-role-repository';
import { MongoAccountRepository } from '../../infra/db/account/repositories/mongo/mongo-account-repository';
import { AccountRepository } from '../../infra/db/account/repositories/account-repository';
import {
  AddAccount,
  AddRole,
  DeleteAccount,
  DeleteRole,
  ListAccounts,
  ListRoles,
  UpdateAccount,
  UpdateRole,
} from '../../domain/usecases';
import {
  DbAddAccount,
  DbAddRole,
  DbDeleteAccount,
  DbDeleteRole,
  DbListAccounts,
  DbListRoles,
  DbUpdateAccount,
  DbUpdateRole,
} from '../../data/usecases';

container.registerSingleton<AccountRepository>(
  'AccountRepository',
  MongoAccountRepository
);
container.registerSingleton<RoleRepository>(
  'RoleRepository',
  MongoRoleRepository
);

container.registerSingleton<AddAccount>('AddAccount', DbAddAccount);
container.registerSingleton<AddRole>('AddRole', DbAddRole);

container.registerSingleton<DeleteAccount>('DeleteAccount', DbDeleteAccount);
container.registerSingleton<DeleteRole>('DeleteRole', DbDeleteRole);

container.registerSingleton<ListAccounts>('ListAccounts', DbListAccounts);
container.registerSingleton<ListRoles>('ListRoles', DbListRoles);

container.registerSingleton<UpdateAccount>('UpdateAccount', DbUpdateAccount);
container.registerSingleton<UpdateRole>('UpdateRole', DbUpdateRole);

container.registerSingleton<Hasher>('Hasher', BcryptAdapter);
container.registerSingleton<Encrypter>('Encrypter', JwtAdapter);
