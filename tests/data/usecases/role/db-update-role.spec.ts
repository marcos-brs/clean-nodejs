import { DbUpdateRole } from '@/data/usecases/role';
import { MemoryRoleRepository } from '@/infra/db/role/repositories/memory/memory-role-repository';

describe('DbUpdateRole', () => {
  it('Should update an role from db', async () => {
    const roleRepository = new MemoryRoleRepository();
    const dbUpdateRole = new DbUpdateRole(roleRepository);

    await roleRepository.create({
      _id: 'any_id',
      role: 'any_role',
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    });

    await dbUpdateRole.update({
      id: 'any_id',
      role: 'another_role',
    });
    const role = await roleRepository.findById('any_id');

    expect(role?.role).toEqual('another_role');
  });
});
