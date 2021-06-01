import { Role } from '@/domain/models/role';
import { BaseRepository } from '@/shared/infra/db/repositories';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface RoleRepository extends BaseRepository<Role> {
  findByRole(role: string): Promise<Role | null>;
}
