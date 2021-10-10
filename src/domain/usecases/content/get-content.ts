import { Content } from '@/domain/models/content';

export interface GetContent {
  get: (data: GetContent.Params) => Promise<GetContent.Result>;
}

export namespace GetContent {
  export type Params = {
    destination_url: string;
  };

  export type Result = Content;
}
