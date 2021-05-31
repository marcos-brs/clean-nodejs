import { v4 as uuidv4 } from 'uuid';
import { injectable, inject } from 'tsyringe';
import { AddRole } from '@/domain/usecases/role';
import { RoleAlreadyRegistered } from '@/domain/errors';
import { RoleRepository } from '@/infra/db/role/repositories/role-repository';

@injectable()
export class DbAddRole implements AddRole {
  constructor(
    @inject('RoleRepository')
    private roleRepository: RoleRepository
  ) {}

  async add({ role }: AddRole.Params): Promise<AddRole.Result> {
    if (await this.roleRepository.findByRole(role)) {
      throw new RoleAlreadyRegistered();
    }

    const newRole = await this.roleRepository.create({
      _id: uuidv4(),
      role,
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    });

    return newRole;
  }
}
