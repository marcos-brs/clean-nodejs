import { MemoryAccountRepository } from '@/infra/db/account/repositories';
import { DbGetAccount } from '@/data/usecases/account';

describe('getAccount', () => {
  it('Should return account account', async () => {
    const accountRepository = new MemoryAccountRepository();
    const dbGetAccount = new DbGetAccount(accountRepository);

    await accountRepository.create({
      _id: 'any_id',
      name: 'any_name',
      lastName: 'any_lastName',
      dateOfBirth: new Date(),
      email: 'any_email',
      password: 'any_password',
      roles: [],
      type: 'student',
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    });

    const accountReturned = await dbGetAccount.get({ email: 'any_email' });

    expect(accountReturned._id).toEqual('any_id');
    expect(accountReturned.name).toEqual('any_name');
    expect(accountReturned.lastName).toEqual('any_lastName');
  });
});
