export interface DeleteRole {
  delete: (role: DeleteRole.Params) => Promise<DeleteRole.Result>;
}

export namespace DeleteRole {
  export type Params = {
    id: string;
  };

  export type Result = boolean;
}
