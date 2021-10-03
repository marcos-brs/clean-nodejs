import { MemoryAccountRepository } from '@/infra/db/account/repositories';
import { UpdateAccount } from '@/domain/usecases/account';
import { DbUpdateStudent } from '@/data/usecases/student/db-update-student';
import { MemoryStudentRepository } from '@/infra/db/students/repositories';

class DbUpdateAccountStub implements UpdateAccount {
  async update(account: UpdateAccount.Params): Promise<UpdateAccount.Result> {
    return Promise.resolve({
      _id: 'any_id',
      student: 'any_student_id',
      name: 'any_name',
      lastName: 'any_lastName',
      dateOfBirth: new Date(),
      email: 'any_email',
      password: 'any_password',
      roles: [],
      type: 'student',
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    });
  }
}

describe('UpdateStudent', () => {
  it('update student', async () => {
    const accountRepository = new MemoryAccountRepository();
    const studentRepository = new MemoryStudentRepository();
    const updateAccount = new DbUpdateAccountStub();
    const dbUpdateStudent = new DbUpdateStudent(
      studentRepository,
      accountRepository,
      updateAccount
    );

    await accountRepository.create({
      _id: 'any_id',
      student: 'any_student_id',
      name: 'any_name',
      lastName: 'any_lastName',
      dateOfBirth: new Date(),
      email: 'any_email',
      password: 'any_password',
      roles: [],
      type: 'student',
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    });

    await studentRepository.create({
      _id: 'any_student_id',
      ciclo: 'any_ciclo',
      state: 'any_state',
      school: 'any_school',
    });

    await dbUpdateStudent.update({
      email: 'any_email',
      ciclo: 'other_ciclo',
      state: 'other_state',
      school: 'other_school',
    });

    const student = await studentRepository.findById('any_student_id');

    expect(student.ciclo).toEqual('other_ciclo');
    expect(student.state).toEqual('other_state');
    expect(student.school).toEqual('other_school');
  });
});
