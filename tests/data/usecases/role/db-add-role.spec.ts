import { DbAddRole } from '@/data/usecases/role';
import { MemoryRoleRepository } from '@/infra/db/role/repositories/memory/memory-role-repository';

describe('DbAddRole', () => {
  it('Should add an role to db', async () => {
    const roleRepository = new MemoryRoleRepository();
    const dbAddRole = new DbAddRole(roleRepository);

    await dbAddRole.add({
      role: 'any_role',
    });
    const role = await roleRepository.findByRole('any_role');

    expect(role?.role).toEqual('any_role');
  });
});
