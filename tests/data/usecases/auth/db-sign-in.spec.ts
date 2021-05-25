import { DbSignIn } from '@/data/usecases/auth';
import { BcryptAdapter } from '@/infra/cryptography/adapters';
import { JwtAdapter } from '@/infra/cryptography/adapters/jwt-adapter';
import { MemoryAccountRepository } from '@/infra/db/account/repositories/memory/memory-account-repository';
import { MemoryRoleRepository } from '@/infra/db/role/repositories/memory/memory-role-repository';
import { env } from '@/main/env';

describe('DbSignIn', () => {
  beforeAll(() => {
    jest.resetModules();
    process.env.JWTSECRET = '123456';
    env.jwtSecret = '123456';
  });
  it('Should signin in an account from db', async () => {
    const accountRepository = new MemoryAccountRepository();
    const roleRepository = new MemoryRoleRepository();
    const encrypter = new JwtAdapter();
    const hasher = new BcryptAdapter();

    const dbSignIn = new DbSignIn(
      accountRepository,
      roleRepository,
      encrypter,
      hasher
    );

    const password = await hasher.hash('any_password');

    await accountRepository.create({
      _id: 'any_id',
      name: 'any_name',
      email: 'any_email',
      roles: [],
      password,
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    });

    const result = await dbSignIn.auth({
      email: 'any_email',
      password: 'any_password',
    });

    expect(result.accessToken).not.toEqual('');
  });
});
