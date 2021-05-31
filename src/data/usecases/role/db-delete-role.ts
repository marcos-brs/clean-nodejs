import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';
import { RoleNotFound } from '@/domain/errors';
import { RoleRepository } from '../../../infra/db/role/repositories/role-repository';
import { DeleteRole } from '../../../domain/usecases';

@injectable()
export class DbDeleteRole implements DeleteRole {
  constructor(
    @inject('RoleRepository')
    private roleRepository: RoleRepository
  ) {}

  async delete({ id }: DeleteRole.Params): Promise<DeleteRole.Result> {
    const role = await this.roleRepository.findById(id);

    if (!role) {
      throw new RoleNotFound();
    }

    await this.roleRepository.delete(id);

    return true;
  }
}
