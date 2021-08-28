import { Account } from '@/domain/models/account';

export interface GetStudent {
  get: (studentData: GetStudent.Params) => Promise<GetStudent.Result>;
}

export namespace GetStudent {
  export type Params = {
    email: string;
  };

  export type Result = Account;
}
