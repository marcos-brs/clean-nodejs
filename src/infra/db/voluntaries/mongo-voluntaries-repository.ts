import { getModelForClass } from '@typegoose/typegoose';
import { Voluntary, VoluntarySchema } from '@/domain/models/voluntary';
import { MongoBaseRepository } from '@/shared/infra/db/repositories';
import { VoluntariesRepository } from './voluntaries-repository';

export class MongoVoluntariesRepository
  extends MongoBaseRepository<Voluntary, VoluntarySchema>
  implements VoluntariesRepository
{
  constructor() {
    super();
    this.ormRepository = getModelForClass(VoluntarySchema);
  }
}
