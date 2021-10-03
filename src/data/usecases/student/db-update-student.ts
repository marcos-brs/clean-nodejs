import { AccountNotFound } from '@/domain/errors';
import { UpdateAccount } from '@/domain/usecases/account';
import { UpdateStudent } from '@/domain/usecases/student';
import { AccountRepository } from '@/infra/db/account/repositories';
import { StudentRepository } from '@/infra/db/students/repositories';
import { inject, injectable } from 'tsyringe';

@injectable()
export class DbUpdateStudent implements UpdateStudent {
  constructor(
    @inject('StudentRepository')
    private studentRepository: StudentRepository,
    @inject('AccountRepository')
    private accountRepository: AccountRepository,
    @inject('UpdateAccount')
    private updateAccount: UpdateAccount
  ) {}

  async update(data: UpdateStudent.Params): Promise<UpdateStudent.Result> {
    const { email } = data;
    const account = await this.accountRepository.findByEmail(email);

    if (!account) {
      throw new AccountNotFound();
    }

    const dataStudent = {
      _id: account.student,
      ciclo: data.ciclo,
      state: data.state,
      school: data.school,
    };

    await this.studentRepository.update(dataStudent);

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
