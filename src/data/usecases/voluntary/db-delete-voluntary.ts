import { injectable, inject } from 'tsyringe';
import { AccountNotFound } from '@/domain/errors';
import { AccountRepository } from '@/infra/db/account/repositories';
import { DeleteVoluntary } from '@/domain/usecases/voluntary';
import { DeleteAccount } from '@/domain/usecases/account';
import { VoluntaryRepository } from '@/infra/db/voluntaries/repositories';

@injectable()
export class DbDeleteVoluntary implements DeleteVoluntary {
  constructor(
    @inject('AccountRepository')
    private accountRepository: AccountRepository,
    @inject('VoluntaryRepository')
    private voluntaryRepository: VoluntaryRepository,
    @inject('DeleteAccount')
    private deleteAccount: DeleteAccount
  ) {}

  async delete(data: DeleteVoluntary.Params): Promise<DeleteVoluntary.Result> {
    const { email } = data;

    const account = await this.accountRepository.findByEmail(email);
    if (!account) {
      throw new AccountNotFound();
    }

    await this.voluntaryRepository.delete(account.voluntary);
    await this.deleteAccount.delete({ id: account._id });

    return true;
  }
}
