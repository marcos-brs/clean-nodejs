import { Account } from '@/domain/models/account';

export interface UpdateVoluntary {
  update: (data: UpdateVoluntary.Params) => Promise<UpdateVoluntary.Result>;
}

export namespace UpdateVoluntary {
  export type Params = {
    email: string;
    name?: string;
    lastName?: string;
    dateOfBirth?: Date;
    materia?: string;
    cargo?: string[];
  };

  export type Result = Account;
}
