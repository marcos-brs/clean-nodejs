import { Account } from '../../models/account';

export interface ListAccounts {
  list: () => Promise<ListAccounts.Result>;
}

export namespace ListAccounts {
  export type Result = Account[];
}
