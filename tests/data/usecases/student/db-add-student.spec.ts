import { MemoryAccountRepository } from '@/infra/db/account/repositories';
import { MemoryStudentRepository } from '@/infra/db/students/repositories';
import { Uuidv4Adapter } from '@/infra/uuid/adapters';
import { DbAddStudent } from '@/data/usecases/student';
import { AddAccount } from '@/domain/usecases/account';

class DbAddAccountStub implements AddAccount {
  async add(account: AddAccount.Params): Promise<AddAccount.Result> {
    return Promise.resolve({
      _id: 'any_id',
      name: 'any_name',
      lastName: 'any_lastName',
      dateOfBirth: new Date(),
      email: 'any_email',
      roles: [],
      type: 'Student',
      student: 'any_student_id',
      password: 'any_password',
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    });
  }
}

describe('AddStudent', () => {
  it('Should add student account', async () => {
    const uuid = new Uuidv4Adapter();
    const accountRepository = new MemoryAccountRepository();
    const studentRepository = new MemoryStudentRepository();
    const addAccount = new DbAddAccountStub();
    const dbAddStudent = new DbAddStudent(
      uuid,
      accountRepository,
      studentRepository,
      addAccount
    );

    await dbAddStudent.add({
      name: 'any_name',
      lastName: 'any_lastName',
      dateOfBirth: new Date(),
      email: 'any_email',
      password: 'any_password',
      ciclo: 'any_ciclo',
      school: 'any_school',
      state: 'any_state',
    });

    const students = await studentRepository.findAll();

    expect(students[0].ciclo).toEqual('any_ciclo');
    expect(students[0].school).toEqual('any_school');
    expect(students[0].state).toEqual('any_state');
  });
});
