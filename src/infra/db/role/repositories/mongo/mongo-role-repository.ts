import { getModelForClass } from '@typegoose/typegoose';
import { MongoBaseRepository } from '../../../../../shared/infra/db/repositories/mongo/mongo-base-repository';
import { Role, RoleSchema } from '../../../../../domain/models/role';
import { RoleRepository } from '../role-repository';

export class MongoRoleRepository
  extends MongoBaseRepository<Role, RoleSchema>
  implements RoleRepository
{
  constructor() {
    super();
    this.ormRepository = getModelForClass(RoleSchema);
  }
}
