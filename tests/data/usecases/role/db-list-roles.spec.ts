import { DbListRoles } from '@/data/usecases/role';
import { MemoryRoleRepository } from '@/infra/db/role/repositories/memory/memory-role-repository';

describe('DbListRoles', () => {
  it('Should list all roles', async () => {
    const roleRepository = new MemoryRoleRepository();
    const dbListRoles = new DbListRoles(roleRepository);

    const role1 = await roleRepository.create({
      _id: 'any_id',
      role: 'any_role1',
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    });

    const role2 = await roleRepository.create({
      _id: 'any_id2',
      role: 'any_role2',
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    });

    const roles = await dbListRoles.list();

    expect(roles).toEqual([role1, role2]);
  });
});
