import { injectable, inject } from 'tsyringe';
import { AccountNotFound } from '@/domain/errors';
import { AccountRepository } from '@/infra/db/account/repositories';
import { GetStudent } from '@/domain/usecases/student';

@injectable()
export class DbGetStudent implements GetStudent {
  constructor(
    @inject('AccountRepository')
    private accountRepository: AccountRepository
  ) {}

  async get(studentData: GetStudent.Params): Promise<GetStudent.Result> {
    const { email } = studentData;

    const account = await this.accountRepository.findStudentByEmail(email);
    if (!account) {
      throw new AccountNotFound();
    }

    return account;
  }
}
