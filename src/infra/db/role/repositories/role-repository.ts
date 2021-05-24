import { BaseRepository } from '../../../../shared/infra/db/repositories/base-repository';
import { Role } from '../../../../domain/models/role';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface RoleRepository extends BaseRepository<Role> {}
