import { Account } from '@/domain/models/account';

export interface AddVoluntary {
  add: (volunteerData: AddVoluntary.Params) => Promise<AddVoluntary.Result>;
}

export namespace AddVoluntary {
  export type Params = {
    name: string;
    lastName: string;
    email: string;
    password: string;
    dateOfBirth: Date;
    materia: string;
    cargo: string[];
  };

  export type Result = Account;
}
