import { Account } from '@/domain/models/account';

export interface UpdateStudent {
  update: (data: UpdateStudent.Params) => Promise<UpdateStudent.Result>;
}

export namespace UpdateStudent {
  export type Params = {
    email: string;
    name?: string;
    lastName?: string;
    dateOfBirth?: Date;
    ciclo?: string;
    state?: string;
    school?: string;
  };

  export type Result = Account;
}
