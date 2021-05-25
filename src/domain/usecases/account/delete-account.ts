export interface DeleteAccount {
  delete: (account: DeleteAccount.Params) => Promise<DeleteAccount.Result>;
}

export namespace DeleteAccount {
  export type Params = {
    id: string;
  };

  export type Result = boolean;
}
