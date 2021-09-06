import { getModelForClass } from '@typegoose/typegoose';
import { Voluntary, VoluntarySchema } from '@/domain/models/voluntary';
import { MongoBaseRepository } from '@/shared/infra/db/repositories';
import { VoluntaryRepository } from './voluntary-repository';

export class MongoVoluntaryRepository
  extends MongoBaseRepository<Voluntary, VoluntarySchema>
  implements VoluntaryRepository
{
  constructor() {
    super();
    this.ormRepository = getModelForClass(VoluntarySchema);
  }
}
