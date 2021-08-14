import { DbAddAccount } from '@/data/usecases/account';
import { BcryptAdapter } from '@/infra/cryptography/adapters';
import { MemoryAccountRepository } from '@/infra/db/account/repositories';
import { Uuidv4Adapter } from '@/infra/uuid/adapters';

describe('DbAddAccount', () => {
  beforeAll(() => {
    jest.resetModules();
    process.env.CRYPTOGRAPHY_SALT = '12';
  });
  it('Should add an account to db', async () => {
    const hasher = new BcryptAdapter();
    const uuid = new Uuidv4Adapter();
    const accountRepository = new MemoryAccountRepository();
    const dbAddAccount = new DbAddAccount(hasher, uuid, accountRepository);

    await dbAddAccount.add({
      name: 'any_name',
      lastName: 'any_lastName',
      dateOfBirth: new Date(),
      email: 'any_email',
      roles: [],
      type: 'Student',
      student: 'any_student_id',
      password: 'any_password',
    });
    const account = await accountRepository.findByEmail('any_email');

    expect(account?.name).toEqual('any_name');
    expect(account?.email).toEqual('any_email');
    expect(account?.roles).toEqual([]);
  });
});
