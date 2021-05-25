import { container } from 'tsyringe';
import { Hasher } from '../../infra/cryptography/protocols';
import { BcryptAdapter } from '../../infra/cryptography/adapters';
import { RoleRepository } from '../../infra/db/role/repositories/role-repository';
import { MongoRoleRepository } from '../../infra/db/role/repositories/mongo/mongo-role-repository';
import { MongoAccountRepository } from '../../infra/db/account/repositories/mongo/mongo-account-repository';
import { AccountRepository } from '../../infra/db/account/repositories/account-repository';
import { AddAccount, AddRole, ListAccounts } from '../../domain/usecases';
import { DbAddAccount, DbAddRole, DbListAccounts } from '../../data/usecases';

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

container.registerSingleton<ListAccounts>('ListAccounts', DbListAccounts);

container.registerSingleton<Hasher>('Hasher', BcryptAdapter);
