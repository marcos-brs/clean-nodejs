import { DbDeleteAccount } from '@/data/usecases/account';
import { MemoryAccountRepository } from '@/infra/db/account/repositories/memory/memory-account-repository';

describe('DbDeleteAccount', () => {
  beforeAll(() => {
    jest.resetModules();
    process.env.CRYPTOGRAPHY_SALT = '12';
  });
  it('Should add an account to db', async () => {
    const accountRepository = new MemoryAccountRepository();
    const dbDeleteAccount = new DbDeleteAccount(accountRepository);

    await accountRepository.create({
      _id: 'any_id',
      name: 'any_name',
      email: 'any_email',
      roles: [],
      password: 'any_password',
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    });

    await dbDeleteAccount.delete({ id: 'any_id' });
    const tryFoundAccount = await accountRepository.findById('any_id');

    expect(tryFoundAccount).toBe(null);
  });
});
