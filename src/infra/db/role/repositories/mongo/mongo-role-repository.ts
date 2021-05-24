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

  public async findByRole(role: string): Promise<Role | null> {
    const roleData = await this.ormRepository.findOne({ role });

    if (roleData === null) return null;

    return roleData.toObject() as Role;
  }
}
