import { MemoryAccountRepository } from '@/infra/db/account/repositories';
import { MemoryStudentRepository } from '@/infra/db/students/repositories';
import { DbListStudents } from '@/data/usecases/student';

describe('ListStudents', () => {
  it('Should return a list of students accounts', async () => {
    const accountRepository = new MemoryAccountRepository();
    const studentRepository = new MemoryStudentRepository();
    const dbListStudents = new DbListStudents(accountRepository);

    const account1 = await accountRepository.create({
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

    const account2 = await accountRepository.create({
      _id: 'any_id2',
      name: 'any_name2',
      lastName: 'any_lastName2',
      dateOfBirth: new Date(),
      email: 'any_email2',
      password: 'any_password2',
      roles: [],
      type: 'student2',
      student: 'any_student_id2',
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    });

    await studentRepository.create({
      _id: 'any_student_id2',
      ciclo: 'any_ciclo2',
      school: 'any_school2',
      state: 'any_state2',
    });

    const accounts = await dbListStudents.list({ pageIndex: 1, pageSize: 10 });

    expect(accounts).toStrictEqual([account1, account2]);
  });
});
