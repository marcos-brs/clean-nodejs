import { MemoryAccountRepository } from '@/infra/db/account/repositories';
import { MemoryVoluntaryRepository } from '@/infra/db/voluntaries/repositories';
import { DeleteAccount } from '@/domain/usecases/account';
import { DbDeleteVoluntary } from '@/data/usecases/voluntary/db-delete-voluntary';

class DbDeleteAccountStub implements DeleteAccount {
  async delete(data: DeleteAccount.Params): Promise<DeleteAccount.Result> {
    return Promise.resolve(true);
  }
}

describe('DeleteVoluntary', () => {
  it('Should delete voluntary account', async () => {
    const accountRepository = new MemoryAccountRepository();
    const voluntaryRepository = new MemoryVoluntaryRepository();
    const deleteAccount = new DbDeleteAccountStub();
    const dbDeleteVoluntary = new DbDeleteVoluntary(
      accountRepository,
      voluntaryRepository,
      deleteAccount
    );

    await accountRepository.create({
      _id: 'any_id',
      name: 'any_name',
      lastName: 'any_lastName',
      dateOfBirth: new Date(),
      email: 'any_email',
      password: 'any_password',
      roles: [],
      type: 'voluntary',
      voluntary: 'any_voluntary_id',
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    });

    await voluntaryRepository.create({
      _id: 'any_voluntary_id',
      materia: 'any_materia',
      cargo: ['any_cargo'],
    });

    const isDeleted = await dbDeleteVoluntary.delete({ email: 'any_email' });
    const voluntary = await voluntaryRepository.findById('any_voluntary_id');

    expect(voluntary).toBe(null);
    expect(isDeleted).toBe(true);
  });
});
