import { injectable, inject } from 'tsyringe';
import { EmailAlreadyRegistered } from '@/domain/errors';
import { AccountRepository } from '@/infra/db/account/repositories';
import { ListStudents } from '@/domain/usecases/student/list-students';
import { AddAccount } from '@/domain/usecases/account';
import { StudentRepository } from '@/infra/db/students/repositories';

@injectable()
export class DbListStudents implements ListStudents {
  constructor(
    @inject('AccountRepository')
    private accountRepository: AccountRepository
  ) {}

  async list(studentsData: ListStudents.Params): Promise<ListStudents.Result> {
    const { pageIndex, pageSize } = studentsData;

    return this.accountRepository.findAllAndPopulateStudents(
      pageIndex,
      pageSize
    );
  }
}
