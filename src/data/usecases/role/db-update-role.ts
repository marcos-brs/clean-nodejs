import { injectable, inject } from 'tsyringe';
import { RoleNotFound } from '@/domain/errors';
import { UpdateRole } from '@/domain/usecases/role';
import { RoleRepository } from '@/infra/db/role/repositories';

@injectable()
export class DbUpdateRole implements UpdateRole {
  constructor(
    @inject('RoleRepository')
    private roleRepository: RoleRepository
  ) {}

  async update({ id, ...data }: UpdateRole.Params): Promise<UpdateRole.Result> {
    const role = await this.roleRepository.findById(id);

    if (!role) {
      throw new RoleNotFound();
    }

    Object.assign(role, { ...data });

    await this.roleRepository.update(role);

    return role;
  }
}
