import { Account } from '@/domain/models/account';

export interface AddAccount {
  add: (account: AddAccount.Params) => Promise<AddAccount.Result>;
}

export namespace AddAccount {
  export type Params = {
    name: string;
    email: string;
    roles: string[];
    password: string;
  };

  export type Result = Account;
}
