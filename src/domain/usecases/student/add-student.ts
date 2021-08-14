import { Account } from '@/domain/models/account';

export interface AddStudent {
  add: (studentData: AddStudent.Params) => Promise<AddStudent.Result>;
}

export namespace AddStudent {
  export type Params = {
    name: string;
    lastName: string;
    email: string;
    password: string;
    dateOfBirth: Date;
    ciclo: string;
    state: string;
    school: string;
  };

  export type Result = Account;
}
