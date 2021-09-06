import { injectable, inject } from 'tsyringe';
import { EmailAlreadyRegistered } from '@/domain/errors';
import { AccountRepository } from '@/infra/db/account/repositories';
import { Uuid } from '@/infra/uuid/protocols';
import { AddAccount } from '@/domain/usecases/account';
import { VoluntaryRepository } from '@/infra/db/voluntaries/repositories';
import { AddVoluntary } from '@/domain/usecases/voluntary';

@injectable()
export class DbAddVoluntary implements AddVoluntary {
  constructor(
    @inject('Uuid')
    private uuid: Uuid,
    @inject('AccountRepository')
    private accountRepository: AccountRepository,
    @inject('VoluntaryRepository')
    private voluntaryRepository: VoluntaryRepository,
    @inject('AddAccount')
    private addAccount: AddAccount
  ) {}

  async add(voluntaryData: AddVoluntary.Params): Promise<AddVoluntary.Result> {
    if (await this.accountRepository.findByEmail(voluntaryData.email)) {
      throw new EmailAlreadyRegistered();
    }

    const { name, lastName, email, dateOfBirth, password, materia, cargo } =
      voluntaryData;

    const { _id } = await this.voluntaryRepository.create({
      _id: this.uuid.generate(),
      materia,
      cargo,
    });

    return this.addAccount.add({
      name,
      lastName,
      dateOfBirth,
      email,
      password,
      roles: [],
      type: 'Voluntary',
      voluntary: _id,
    });
  }
}
