export interface UpdateAccount {
  update: (account: UpdateAccount.Params) => Promise<UpdateAccount.Result>;
}

export namespace UpdateAccount {
  export type Params = {
    id: string;
    name?: string;
    email?: string;
    roles?: string[];
    password?: string;
  };

  export type Result = boolean;
}
