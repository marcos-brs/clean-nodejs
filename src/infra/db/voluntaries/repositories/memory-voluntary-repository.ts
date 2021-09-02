import { Voluntary } from '@/domain/models/voluntary';
import { MemoryBaseRepository } from '@/shared/infra/db/repositories';
import { VoluntaryRepository } from './voluntary-repository';

export class MemoryVoluntaryRepository
  extends MemoryBaseRepository<Voluntary>
  implements VoluntaryRepository
{
  constructor() {
    super();
  }
}
