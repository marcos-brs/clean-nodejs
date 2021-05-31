import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';
import { ListRoles } from '@/domain/usecases/role';
import { RoleRepository } from '@/infra/db/role/repositories/role-repository';

@injectable()
export class DbListRoles implements ListRoles {
  constructor(
    @inject('RoleRepository')
    private roleRepository: RoleRepository
  ) {}

  async list(): Promise<ListRoles.Result> {
    return this.roleRepository.findAll();
  }
}
