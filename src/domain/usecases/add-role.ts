export interface AddRole {
  add: (role: AddRole.Params) => Promise<AddRole.Result>;
}

export namespace AddRole {
  export type Params = {
    role: string;
  };

  export type Result = boolean;
}
