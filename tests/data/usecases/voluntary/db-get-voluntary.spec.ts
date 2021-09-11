import { MemoryAccountRepository } from '@/infra/db/account/repositories';
import { MemoryVoluntaryRepository } from '@/infra/db/voluntaries/repositories';
import { DbGetVoluntary } from '@/data/usecases/voluntary';

describe('getVoluntary', () => {
  it('Should return voluntary account', async () => {
    const accountRepository = new MemoryAccountRepository();
    const voluntaryRepository = new MemoryVoluntaryRepository();
    const dbGetVoluntary = new DbGetVoluntary(accountRepository);

    const account = await accountRepository.create({
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

    const accountVoluntary = await voluntaryRepository.create({
      _id: 'any_voluntary_id',
      materia: 'any_materia',
      cargo: ['any_cargo'],
    });

    const accountReturned = await dbGetVoluntary.get({ email: 'any_email' });

    expect(accountReturned._id).toEqual('any_id');
    expect(accountReturned.name).toEqual('any_name');
    expect(accountReturned.voluntary).toEqual('any_voluntary_id');
  });
});
