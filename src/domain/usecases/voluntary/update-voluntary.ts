import { Account } from '@/domain/models/account';

export interface UpdateVoluntary {
  update: (data: UpdateVoluntary.Params) => Promise<UpdateVoluntary.Result>;
}

export namespace UpdateVoluntary {
  export type Params = {
    email: String;
    name?: String;
    lastName?: String;
    dateOfBirth?: Date;
    materia?: String;
    cargo?: String[];
  };

  export type Result = Account;
}
