import { getModelForClass } from '@typegoose/typegoose';
import { Account, AccountSchema } from '@/domain/models/account';
import { MongoBaseRepository } from '@/shared/infra/db/repositories';
import { StudentSchema } from '@/domain/models/student';
import { AccountRepository } from './account-repository';

export class MongoAccountRepository
  extends MongoBaseRepository<Account, AccountSchema>
  implements AccountRepository
{
  constructor() {
    super();
    this.ormRepository = getModelForClass(AccountSchema);
  }

  public async findByEmail(email: string): Promise<Account | null> {
    const account = await this.ormRepository.findOne({ email });

    if (account === null) return null;

    return account.toObject() as Account;
  }

  public async findAllAndPopulateStudents(
    pageIndex: number,
    pageSize: number
  ): Promise<Account[]> {
    const accounts = await this.ormRepository
      .find()
      .limit(pageSize)
      .skip((pageIndex - 1) * pageSize)
      .populate('student');

    return accounts as unknown as Account[];
  }

  public async findStudentByEmail(email: string): Promise<Account | null> {
    const account = await this.ormRepository
      .findOne({ email })
      .populate('student');

    return account as unknown as Account;
  }
}
