import { Role } from '@/domain/models/role';

export interface UpdateRole {
  update: (role: UpdateRole.Params) => Promise<UpdateRole.Result>;
}

export namespace UpdateRole {
  export type Params = {
    id: string;
    role: string;
  };

  export type Result = Role;
}
