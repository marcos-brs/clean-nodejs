import { Voluntary } from '@/domain/models/voluntary';
import { MemoryBaseRepository } from '@/shared/infra/db/repositories';
import { VoluntariesRepository } from './voluntaries-repository';

export class MemoryVoluntariesRepository
  extends MemoryBaseRepository<Voluntary>
  implements VoluntariesRepository
{
  constructor() {
    super();
  }
}
