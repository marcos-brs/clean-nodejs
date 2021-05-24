import { getModelForClass } from '@typegoose/typegoose';
import { MongoBaseRepository } from '../../../../../shared/infra/db/repositories/mongo/mongo-base-repository';
import { Account, AccountSchema } from '../../../../../domain/models/account';
import AccountRepository from '../account-repository';

export class MongoAccountRepository
  extends MongoBaseRepository<Account, AccountSchema>
  implements AccountRepository
{
  constructor() {
    super();
    this.ormRepository = getModelForClass(AccountSchema);
  }
}
