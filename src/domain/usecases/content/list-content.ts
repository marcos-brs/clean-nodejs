import { Content } from '@/domain/models/content';

export interface ListContent {
  list: (contentData: ListContent.Params) => Promise<ListContent.Result>;
}

export namespace ListContent {
  export type Params = {
    pageIndex: number;
    pageSize: number;
  };

  export type Result = Content[];
}
