import { MemoryAccountRepository } from '@/infra/db/account/repositories';
import { MemoryVoluntaryRepository } from '@/infra/db/voluntaries/repositories';
import { Uuidv4Adapter } from '@/infra/uuid/adapters';
import { DbAddVoluntary } from '@/data/usecases/voluntary';
import { AddAccount } from '@/domain/usecases/account';

class DbAddAccountStub implements AddAccount {
  async add(account: AddAccount.Params): Promise<AddAccount.Result> {
    return Promise.resolve({
      _id: 'any_id',
      name: 'any_name',
      lastName: 'any_lastName',
      dateOfBirth: new Date(),
      email: 'any_email',
      roles: [],
      type: 'Voluntary',
      voluntary: 'any_volunteer_id',
      password: 'any_password',
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    });
  }
}

describe('AddVoluntary', () => {
  it('Should add a volunteer account', async () => {
    const uuid = new Uuidv4Adapter();
    const accountRepository = new MemoryAccountRepository();
    const voluntaryRepository = new MemoryVoluntaryRepository();
    const addAccount = new DbAddAccountStub();
    const dbAddVoluntary = new DbAddVoluntary(
      uuid,
      accountRepository,
      voluntaryRepository,
      addAccount
    );

    await dbAddVoluntary.add({
      name: 'any_name',
      lastName: 'any_lastName',
      dateOfBirth: new Date(),
      email: 'any_email',
      password: 'any_password',
      materia: 'any_materia',
      cargo: ['any_cargo'],
    });

    const voluntaries = await voluntaryRepository.findAll();

    expect(voluntaries[0].materia).toEqual('any_materia');
    expect(voluntaries[0].cargo[0]).toEqual('any_cargo');
  });
});
