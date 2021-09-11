export interface DeleteVoluntary {
  delete: (data: DeleteVoluntary.Params) => Promise<DeleteVoluntary.Result>;
}

export namespace DeleteVoluntary {
  export type Params = {
    email: string;
  };

  export type Result = boolean;
}
