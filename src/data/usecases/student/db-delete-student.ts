import { injectable, inject } from 'tsyringe';
import { AccountNotFound } from '@/domain/errors';
import { AccountRepository } from '@/infra/db/account/repositories';
import { DeleteStudent } from '@/domain/usecases/student/delete-student';
import { DeleteAccount } from '@/domain/usecases/account';
import { StudentRepository } from '@/infra/db/students/repositories';

@injectable()
export class DbDeleteStudent implements DeleteStudent {
  constructor(
    @inject('AccountRepository')
    private accountRepository: AccountRepository,
    @inject('StudentRepository')
    private studentRepository: StudentRepository,
    @inject('DeleteAccount')
    private deleteAccount: DeleteAccount
  ) {}

  async delete(studentData: DeleteStudent.Params): Promise<DeleteStudent.Result> {
    const {
      email
    } = studentData;

    const account = await this.accountRepository.findByEmail(email)
    if (!account) {
      throw new AccountNotFound();
    }

    await this.studentRepository.delete(account.student);
    await this.deleteAccount.delete({id: account._id});

    return true;

  }
}
