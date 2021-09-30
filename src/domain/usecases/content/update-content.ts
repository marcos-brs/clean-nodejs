import { Content } from '@/domain/models/content';

export interface UpdateContent {
  update: (content: UpdateContent.Params) => Promise<UpdateContent.Result>;
}

export namespace UpdateContent {
  export type Params = {
    destination_url: string;
    title?: string;
    description?: string;
    owner_id?: string;
    posted_at?: Date;
  };

  export type Result = Content;
}
