export type Account = {
  _id: string;
  name: string;
  email: string;
  password: string;
  roles: string[];
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
};
