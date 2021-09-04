import { AccountNotFound } from '@/domain/errors';
import { UpdateAccount } from '@/domain/usecases/account';
import { UpdateVoluntary } from '@/domain/usecases/voluntary';
import { AccountRepository } from '@/infra/db/account/repositories';
import { VoluntariesRepository } from '@/infra/db/voluntaries';
import { inject, injectable } from 'tsyringe';

@injectable()
export class DbUpdateVoluntary implements UpdateVoluntary {
  constructor(
    @inject('VoluntariesRepository')
    private voluntariesRepository: VoluntariesRepository,
    @inject('AccountRepository')
    private accountRepository: AccountRepository,
    @inject('UpdateAccount')
    private updateAccount: UpdateAccount
  ) {}

  async update(data: UpdateVoluntary.Params): Promise<UpdateVoluntary.Result> {
    const { email } = data;
    const account = await this.accountRepository.findByEmail(email);

    if (!account) {
      throw new AccountNotFound();
    }

    const dataVoluntary = {
      _id: account.voluntary,
      materia: data.materia,
      cargo: data.cargo,
    };

    await this.voluntariesRepository.update(dataVoluntary);

    const dataAccount = {
      ...account,
      id: account._id,
      name: data.name,
      lastName: data.lastName,
      dateOfBirth: data.dateOfBirth,
    };

    const updatedAccount = await this.updateAccount.update(dataAccount);
    return updatedAccount;
  }
}
