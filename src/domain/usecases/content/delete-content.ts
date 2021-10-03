export interface DeleteContent {
  delete: (content: DeleteContent.Params) => Promise<DeleteContent.Result>;
}

export namespace DeleteContent {
  export type Params = {
    destination_url: string;
  };

  export type Result = boolean;
}
