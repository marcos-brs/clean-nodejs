import { Student } from '@/domain/models/student';
import { MemoryBaseRepository } from '@/shared/infra/db/repositories';
import { StudentRepository } from './student-repository';

export class MemoryStudentRepository
  extends MemoryBaseRepository<Student>
  implements StudentRepository
{
  constructor() {
    super();
  }
}
