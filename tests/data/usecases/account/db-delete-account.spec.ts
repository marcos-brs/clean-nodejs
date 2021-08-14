import { DbDeleteAccount } from '@/data/usecases/account';
import { MemoryAccountRepository } from '@/infra/db/account/repositories';

describe('DbDeleteAccount', () => {
  it('Should delete an account from db', async () => {
    const accountRepository = new MemoryAccountRepository();
    const dbDeleteAccount = new DbDeleteAccount(accountRepository);

    await accountRepository.create({
      _id: 'any_id',
      name: 'any_name',
      lastName: 'any_lastName',
      dateOfBirth: new Date(),
      email: 'any_email',
      roles: [],
      type: 'Student',
      student: 'any_student_id',
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
