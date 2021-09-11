import { Account } from '@/domain/models/account';

export interface GetVoluntary {
  get: (voluntaryData: GetVoluntary.Params) => Promise<GetVoluntary.Result>;
}

export namespace GetVoluntary {
  export type Params = {
    email: string;
  };

  export type Result = Account;
}
