import { MemoryAccountRepository } from '@/infra/db/account/repositories';
import { MemoryVoluntariesRepository } from '@/infra/db/voluntaries';
import { UpdateAccount } from '@/domain/usecases/account';
import { DbUpdateVoluntary } from '@/data/usecases/voluntary/db-update-voluntary';

class DbUpdateAccountStub implements UpdateAccount {
  async update(account: UpdateAccount.Params): Promise<UpdateAccount.Result> {
    return Promise.resolve({
      _id: 'any_id',
      voluntary: 'any_voluntary_id',
      name: 'any_name',
      lastName: 'any_lastName',
      dateOfBirth: new Date(),
      email: 'any_email',
      password: 'any_password',
      roles: [],
      type: 'voluntary',
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    });
  }
}

describe('UpdateVoluntary', () => {
  it('update voluntary', async () => {
    const accountRepository = new MemoryAccountRepository();
    const voluntaryRepository = new MemoryVoluntariesRepository();
    const updateAccount = new DbUpdateAccountStub();
    const dbUpdateVoluntary = new DbUpdateVoluntary(
      voluntaryRepository,
      accountRepository,
      updateAccount
    );

    await accountRepository.create({
      _id: 'any_id',
      voluntary: 'any_voluntary_id',
      name: 'any_name',
      lastName: 'any_lastName',
      dateOfBirth: new Date(),
      email: 'any_email',
      password: 'any_password',
      roles: [],
      type: 'voluntary',
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    });

    await voluntaryRepository.create({
      _id: 'any_voluntary_id',
      materia: 'any_materia',
      cargo: ['any_cargo'],
    });

    await dbUpdateVoluntary.update({
      email: 'any_email',
      materia: 'other_materia',
    });

    const voluntary = await voluntaryRepository.findById('any_voluntary_id');

    expect(voluntary.materia).toEqual('other_materia');
  });
});
