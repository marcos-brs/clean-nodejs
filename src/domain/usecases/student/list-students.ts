import { Account } from '@/domain/models/account';

export interface ListStudents {
  list: (studentsData: ListStudents.Params) => Promise<ListStudents.Result>;
}

export namespace ListStudents {
  export type Params = {
    pageIndex: number;
    pageSize: number;
  };

  export type Result = Account[];
}
