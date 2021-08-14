import { injectable, inject } from 'tsyringe';
import { AddAccount } from '@/domain/usecases/account';
import { EmailAlreadyRegistered } from '@/domain/errors';
import { Hasher } from '@/infra/cryptography/protocols';
import { AccountRepository } from '@/infra/db/account/repositories';
import { Uuid } from '@/infra/uuid/protocols';

@injectable()
export class DbAddAccount implements AddAccount {
  constructor(
    @inject('Hasher')
    private hasher: Hasher,
    @inject('Uuid')
    private uuid: Uuid,
    @inject('AccountRepository')
    private accountRepository: AccountRepository
  ) {}

  async add(account: AddAccount.Params): Promise<AddAccount.Result> {
    if (await this.accountRepository.findByEmail(account.email)) {
      throw new EmailAlreadyRegistered();
    }

    const { name, lastName, email, dateOfBirth, password, roles, type } =
      account;

    const hashedPassword = await this.hasher.hash(password);

    if (type === 'Student') {
      const { student } = account;
      const addStudent = await this.accountRepository.create({
        _id: this.uuid.generate(),
        name,
        lastName,
        dateOfBirth,
        email,
        password: hashedPassword,
        roles: roles as string[],
        type,
        student,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null,
      });

      return addStudent;
    }
    if (type === 'Voluntary') {
      const { voluntary } = account;
      const addVoluntary = await this.accountRepository.create({
        _id: this.uuid.generate(),
        name,
        lastName,
        dateOfBirth,
        email,
        password: hashedPassword,
        roles: roles as string[],
        type,
        voluntary,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null,
      });

      return addVoluntary;
    }

    throw new Error('Tipo inVálido');
  }
}
