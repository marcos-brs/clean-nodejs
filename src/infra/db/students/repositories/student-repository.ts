import { Student } from '@/domain/models/student';
import { BaseRepository } from '@/shared/infra/db/repositories';

export type StudentRepository = BaseRepository<Student>;
