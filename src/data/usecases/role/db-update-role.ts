import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';
import { RoleRepository } from '../../../infra/db/role/repositories/role-repository';
import { UpdateRole } from '../../../domain/usecases';

@injectable()
export class DbUpdateRole implements UpdateRole {
  constructor(
    @inject('RoleRepository')
    private roleRepository: RoleRepository
  ) {}

  async update({ id, ...data }: UpdateRole.Params): Promise<UpdateRole.Result> {
    const role = await this.roleRepository.findById(id);

    if (role) {
      Object.assign(role, { ...data });

      return this.roleRepository.update(role);
    }
    return false;
  }
}
