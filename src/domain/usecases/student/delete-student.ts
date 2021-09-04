export interface DeleteStudent {
  delete: (studentData: DeleteStudent.Params) => Promise<DeleteStudent.Result>;
}

export namespace DeleteStudent {
  export type Params = {
    email: string;
  };

  export type Result = boolean;
}
