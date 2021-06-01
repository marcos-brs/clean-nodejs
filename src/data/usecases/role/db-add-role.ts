import { injectable, inject } from 'tsyringe';
import { AddRole } from '@/domain/usecases/role';
import { RoleAlreadyRegistered } from '@/domain/errors';
import { RoleRepository } from '@/infra/db/role/repositories';
import { Uuid } from '@/infra/uuid/protocols';

@injectable()
export class DbAddRole implements AddRole {
  constructor(
    @inject('Uuid')
    private uuid: Uuid,
    @inject('RoleRepository')
    private roleRepository: RoleRepository
  ) {}

  async add({ role }: AddRole.Params): Promise<AddRole.Result> {
    if (await this.roleRepository.findByRole(role)) {
      throw new RoleAlreadyRegistered();
    }

    const newRole = await this.roleRepository.create({
      _id: this.uuid.generate(),
      role,
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    });

    return newRole;
  }
}
