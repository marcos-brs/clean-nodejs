import { injectable, inject } from 'tsyringe';
import { SignIn } from '@/domain/usecases/auth';
import { AccountNotFound, InvalidPassword } from '@/domain/errors';
import { Encrypter, Hasher } from '@/infra/cryptography/protocols';
import { AccountRepository } from '@/infra/db/account/repositories/account-repository';
import { RoleRepository } from '@/infra/db/role/repositories/role-repository';

@injectable()
export class DbSignIn implements SignIn {
  constructor(
    @inject('AccountRepository')
    private accountRepository: AccountRepository,
    @inject('RoleRepository')
    private roleRepository: RoleRepository,
    @inject('Encrypter')
    private encrypter: Encrypter,
    @inject('Hasher')
    private hasher: Hasher
  ) {}

  async auth({ email, password }: SignIn.Params): Promise<SignIn.Result> {
    const account = await this.accountRepository.findByEmail(email);

    if (!account) {
      throw new AccountNotFound();
    }

    const passwordIsCorrect = await this.hasher.compare(
      password,
      account.password
    );

    if (!passwordIsCorrect) {
      throw new InvalidPassword();
    }

    const roles = await Promise.all(
      account.roles.map(role => this.roleRepository.findById(role))
    );

    const rolesNames = roles.map(role => role?.role);

    const payload = {
      id: account._id,
      roles: rolesNames,
    };

    const accessToken = await this.encrypter.encrypt(payload);

    return { accessToken };
  }
}
