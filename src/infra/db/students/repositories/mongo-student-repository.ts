import { getModelForClass } from '@typegoose/typegoose';
import { Student, StudentSchema } from '@/domain/models/student';
import { MongoBaseRepository } from '@/shared/infra/db/repositories';
import { StudentRepository } from './student-repository';

export class MongoStudentRepository
  extends MongoBaseRepository<Student, StudentSchema>
  implements StudentRepository
{
  constructor() {
    super();
    this.ormRepository = getModelForClass(StudentSchema);
  }
}
