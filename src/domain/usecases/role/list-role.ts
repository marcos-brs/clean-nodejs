import { Role } from '../../models/role';

export interface ListRoles {
  list: () => Promise<ListRoles.Result>;
}

export namespace ListRoles {
  export type Result = Role[];
}
