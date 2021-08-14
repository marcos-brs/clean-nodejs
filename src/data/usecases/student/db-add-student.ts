import { injectable, inject } from 'tsyringe';
import { EmailAlreadyRegistered } from '@/domain/errors';
import { AccountRepository } from '@/infra/db/account/repositories';
import { Uuid } from '@/infra/uuid/protocols';
import { AddStudent } from '@/domain/usecases/student/add-student';
import { AddAccount } from '@/domain/usecases/account';
import { StudentRepository } from '@/infra/db/students/repositories';

@injectable()
export class DbAddStudent implements AddStudent {
  constructor(
    @inject('Uuid')
    private uuid: Uuid,
    @inject('AccountRepository')
    private accountRepository: AccountRepository,
    @inject('StudentRepository')
    private studentRepository: StudentRepository,
    @inject('AddAccount')
    private addAccount: AddAccount
  ) {}

  async add(studentData: AddStudent.Params): Promise<AddStudent.Result> {
    if (await this.accountRepository.findByEmail(studentData.email)) {
      throw new EmailAlreadyRegistered();
    }

    const {
      name,
      lastName,
      email,
      dateOfBirth,
      password,
      ciclo,
      school,
      state,
    } = studentData;

    const { _id } = await this.studentRepository.create({
      _id: this.uuid.generate(),
      ciclo,
      school,
      state,
    });

    return this.addAccount.add({
      name,
      lastName,
      dateOfBirth,
      email,
      password,
      roles: [],
      type: 'Student',
      student: _id,
    });
  }
}
