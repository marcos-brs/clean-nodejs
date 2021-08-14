import { Account } from '@/domain/models/account';

export interface AddAccount {
  add: (account: AddAccount.Params) => Promise<AddAccount.Result>;
}

export namespace AddAccount {
  export type Params = {
    name: string;
    lastName: string;
    dateOfBirth: Date;
    email: string;
    roles: string[];
    password: string;
    type: string;
    student?: string;
    voluntary?: string;
  };

  export type Result = Account;
}
