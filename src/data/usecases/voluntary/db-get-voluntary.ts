import { injectable, inject } from 'tsyringe';
import { AccountNotFound } from '@/domain/errors';
import { AccountRepository } from '@/infra/db/account/repositories';
import { GetVoluntary } from '@/domain/usecases/voluntary';

@injectable()
export class DbGetVoluntary implements GetVoluntary {
  constructor(
    @inject('AccountRepository')
    private accountRepository: AccountRepository
  ) {}

  async get(voluntaryData: GetVoluntary.Params): Promise<GetVoluntary.Result> {
    const { email } = voluntaryData;

    const account = await this.accountRepository.findVoluntaryByEmail(email);
    if (!account) {
      throw new AccountNotFound();
    }

    return account;
  }
}
