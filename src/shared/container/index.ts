import { container } from 'tsyringe';
import {
  AddRole,
  DeleteRole,
  ListRoles,
  UpdateRole,
} from '@/domain/usecases/role';
import { SignIn } from '@/domain/usecases/auth';
import { Uuid } from '@/infra/uuid/protocols';
import { Uuidv4Adapter } from '@/infra/uuid/adapters';
import {
  AccountRepository,
  MongoAccountRepository,
} from '@/infra/db/account/repositories';
import {
  RoleRepository,
  MongoRoleRepository,
} from '@/infra/db/role/repositories';
import {
  AddAccount,
  DeleteAccount,
  ListAccounts,
  UpdateAccount,
} from '@/domain/usecases/account';
import {
  DbAddAccount,
  DbAddRole,
  DbAddStudent,
  DbDeleteAccount,
  DbDeleteRole,
  DbDeleteStudent,
  DbListAccounts,
  DbListRoles,
  DbListStudents,
  DbSignIn,
  DbUpdateAccount,
  DbUpdateRole,
  DbGetStudent,
} from '@/data/usecases';
import { Encrypter, Hasher } from '@/infra/cryptography/protocols';
import { BcryptAdapter } from '@/infra/cryptography/adapters';
import { JwtAdapter } from '@/infra/cryptography/adapters/jwt-adapter';
import {
  MongoStudentRepository,
  StudentRepository,
} from '@/infra/db/students/repositories';
import {
  AddStudent,
  DeleteStudent,
  GetStudent,
  ListStudents,
} from '@/domain/usecases/student';
import {
  MongoVoluntariesRepository,
  VoluntariesRepository,
} from '@/infra/db/voluntaries';

container.registerSingleton<AccountRepository>(
  'AccountRepository',
  MongoAccountRepository
);
container.registerSingleton<RoleRepository>(
  'RoleRepository',
  MongoRoleRepository
);

container.registerSingleton<StudentRepository>(
  'StudentRepository',
  MongoStudentRepository
);

container.registerSingleton<VoluntariesRepository>(
  'VoluntariesRepository',
  MongoVoluntariesRepository
);

container.registerSingleton<AddAccount>('AddAccount', DbAddAccount);
container.registerSingleton<AddRole>('AddRole', DbAddRole);
container.registerSingleton<AddStudent>('AddStudent', DbAddStudent);

container.registerSingleton<DeleteAccount>('DeleteAccount', DbDeleteAccount);
container.registerSingleton<DeleteRole>('DeleteRole', DbDeleteRole);
container.registerSingleton<DeleteStudent>('DeleteStudent', DbDeleteStudent);

container.registerSingleton<ListAccounts>('ListAccounts', DbListAccounts);
container.registerSingleton<ListRoles>('ListRoles', DbListRoles);
container.registerSingleton<ListStudents>('ListStudents', DbListStudents);

container.registerSingleton<UpdateAccount>('UpdateAccount', DbUpdateAccount);
container.registerSingleton<UpdateRole>('UpdateRole', DbUpdateRole);

container.registerSingleton<SignIn>('SignIn', DbSignIn);

container.registerSingleton<Hasher>('Hasher', BcryptAdapter);
container.registerSingleton<Encrypter>('Encrypter', JwtAdapter);
container.registerSingleton<Uuid>('Uuid', Uuidv4Adapter);

container.registerSingleton<DeleteStudent>('DeleteStudent', DbDeleteStudent);
container.registerSingleton<ListStudents>('ListStudents', DbListStudents);
container.registerSingleton<GetStudent>('GetStudent', DbGetStudent);
