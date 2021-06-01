import { DbAddRole } from '@/data/usecases/role';
import { MemoryRoleRepository } from '@/infra/db/role/repositories';
import { Uuidv4Adapter } from '@/infra/uuid/adapters';

describe('DbAddRole', () => {
  it('Should add an role to db', async () => {
    const roleRepository = new MemoryRoleRepository();
    const uuid = new Uuidv4Adapter();
    const dbAddRole = new DbAddRole(uuid, roleRepository);

    await dbAddRole.add({
      role: 'any_role',
    });
    const role = await roleRepository.findByRole('any_role');

    expect(role?.role).toEqual('any_role');
  });
});
