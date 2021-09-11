import { Account } from '@/domain/models/account';

export interface GetAccount {
  get: (data: GetAccount.Params) => Promise<GetAccount.Result>;
}

export namespace GetAccount {
  export type Params = {
    email: string;
  };

  export type Result = Account;
}
