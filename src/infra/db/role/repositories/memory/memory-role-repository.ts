import { MemoryBaseRepository } from '../../../../../shared/infra/db/repositories/memory/memory-base-repository';
import { RoleRepository } from '../role-repository';
import { Role } from '../../../../../domain/models/role';

export class MemoryRoleRepository
  extends MemoryBaseRepository<Role>
  implements RoleRepository
{
  constructor() {
    super();
  }

  public async findByRole(role: string): Promise<Role | null> {
    const foundData = this.model.find(data => data.role === role);

    if (!foundData) {
      return null;
    }

    return foundData;
  }
}
