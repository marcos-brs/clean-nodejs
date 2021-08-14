import { DbListAccounts } from '@/data/usecases/account';
import { MemoryAccountRepository } from '@/infra/db/account/repositories';

describe('DbListAccounts', () => {
  it('Should list all accounts', async () => {
    const accountRepository = new MemoryAccountRepository();
    const dbListAccounts = new DbListAccounts(accountRepository);

    const account1 = await accountRepository.create({
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

    const account2 = await accountRepository.create({
      _id: 'any_id2',
      name: 'any_name2',
      lastName: 'any_lastName2',
      dateOfBirth: new Date(),
      email: 'any_email2',
      roles: [],
      password: 'any_password2',
      type: 'Student',
      student: 'any_student_id2',
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    });

    const accounts = await dbListAccounts.list();

    expect(accounts).toEqual([account1, account2]);
  });
});
