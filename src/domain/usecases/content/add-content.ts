import { Content } from '@/domain/models/content';

export interface AddContent {
  add: (content: AddContent.Params) => Promise<AddContent.Result>;
}

export namespace AddContent {
  export type Params = {
    title: string;
    description: string;
    destination_url: string;
    owner_id: string;
    posted_at: Date;
  };

  export type Result = Content;
}
