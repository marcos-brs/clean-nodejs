import { DbDeleteRole } from '@/data/usecases/role';
import { MemoryRoleRepository } from '@/infra/db/role/repositories';

describe('DbDeleteRole', () => {
  it('Should delete an role from db', async () => {
    const roleRepository = new MemoryRoleRepository();
    const dbDeleteRole = new DbDeleteRole(roleRepository);

    await roleRepository.create({
      _id: 'any_id',
      role: 'any_role',
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    });

    await dbDeleteRole.delete({ id: 'any_id' });
    const tryFoundRole = await roleRepository.findById('any_id');

    expect(tryFoundRole).toBe(null);
  });
});
