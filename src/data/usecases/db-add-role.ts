import 'reflect-metadata';
import { v4 as uuidv4 } from 'uuid';
import { injectable, inject } from 'tsyringe';
import { RoleRepository } from '../../infra/db/role/repositories/role-repository';
import { AddRole } from '../../domain/usecases/add-role';

@injectable()
export class DbAddRole implements AddRole {
  constructor(
    @inject('RoleRepository')
    private roleRepository: RoleRepository
  ) {}

  async add({ role }: AddRole.Params): Promise<AddRole.Result> {
    console.log('role:', role);
    if (await this.roleRepository.findByRole(role)) return false;

    await this.roleRepository.create({
      _id: uuidv4(),
      role,
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    });

    return true;
  }
}
