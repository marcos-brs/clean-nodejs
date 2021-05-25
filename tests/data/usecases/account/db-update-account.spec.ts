import { DbUpdateAccount } from '@/data/usecases/account';
import { BcryptAdapter } from '@/infra/cryptography/adapters';
import { MemoryAccountRepository } from '@/infra/db/account/repositories/memory/memory-account-repository';
import { MemoryRoleRepository } from '@/infra/db/role/repositories/memory/memory-role-repository';

describe('DbUpdateAccount', () => {
  beforeAll(() => {
    jest.resetModules();
    process.env.CRYPTOGRAPHY_SALT = '12';
  });
  it('Should update an account from db', async () => {
    const hasher = new BcryptAdapter();
    const accountRepository = new MemoryAccountRepository();
    const roleRepository = new MemoryRoleRepository();
    const dbUpdateAccount = new DbUpdateAccount(
      hasher,
      accountRepository,
      roleRepository
    );

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

    await dbUpdateAccount.update({
      id: 'any_id',
      name: 'another_name',
    });
    const account = await accountRepository.findById('any_id');

    expect(account?.name).toEqual('another_name');
    expect(account?.email).toEqual('any_email');
    expect(account?.roles).toEqual([]);
  });
});
