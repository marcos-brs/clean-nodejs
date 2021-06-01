import { Role } from '@/domain/models/role';
import { MemoryBaseRepository } from '@/shared/infra/db/repositories';
import { RoleRepository } from './role-repository';

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
