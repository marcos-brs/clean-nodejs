import { RoleModel } from './role';

export type AccountModel = {
  id: string;
  name: string;
  email: string;
  roles: RoleModel[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
};
