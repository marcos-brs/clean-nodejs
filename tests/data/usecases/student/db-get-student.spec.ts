import { MemoryAccountRepository } from '@/infra/db/account/repositories';
import { MemoryStudentRepository } from '@/infra/db/students/repositories';
import { DbGetStudent } from '@/data/usecases/student';

describe('getStudent', () => {
  it('Should return student account', async () => {
    const accountRepository = new MemoryAccountRepository();
    const studentRepository = new MemoryStudentRepository();
    const dbGetStudent = new DbGetStudent(accountRepository);

    const account = await accountRepository.create({
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

    const accountStudent = await studentRepository.create({
      _id: 'any_student_id',
      ciclo: 'any_ciclo',
      school: 'any_school',
      state: 'any_state',
    });

    const accountReturned = await dbGetStudent.get({ email: 'any_email' });

    expect(accountReturned._id).toEqual('any_id');
    expect(accountReturned.name).toEqual('any_name');
    expect(accountReturned.student).toEqual('any_student_id');
  });
});
