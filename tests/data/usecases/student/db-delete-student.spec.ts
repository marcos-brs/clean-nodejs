import { MemoryAccountRepository } from '@/infra/db/account/repositories';
import { MemoryStudentRepository } from '@/infra/db/students/repositories';
import { DeleteAccount } from '@/domain/usecases/account';
import { DbDeleteStudent } from '@/data/usecases/student/db-delete-student';

class DbDeleteAccountStub implements DeleteAccount {
  async delete(account: DeleteAccount.Params): Promise<DeleteAccount.Result> {
    return Promise.resolve(true);
  }
}

describe('DeleteStudent', () => {
  it('Should delete student account', async () => {
    const accountRepository = new MemoryAccountRepository();
    const studentRepository = new MemoryStudentRepository();
    const deleteAccount = new DbDeleteAccountStub();
    const dbDeleteStudent = new DbDeleteStudent(
      accountRepository,
      studentRepository,
      deleteAccount
    );

    await accountRepository.create({
      _id: 'any_id',
      name: 'any_name',
      lastName: 'any_lastName',
      dateOfBirth: new Date(),
      email: 'any_email',
      password: 'any_password',
      roles: [],
      type: 'student',
      student: 'any_student_id',
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    });

    await studentRepository.create({
      _id: 'any_student_id',
      ciclo: 'any_ciclo',
      school: 'any_school',
      state: 'any_state',
    });

    const isDeleted = await dbDeleteStudent.delete({ email: 'any_email' });
    const student = await studentRepository.findById('any_student_id');

    expect(student).toBe(null);
    expect(isDeleted).toBe(true);
  });
});
