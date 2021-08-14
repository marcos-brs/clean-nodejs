export type Account = {
  _id: string;
  name: string;
  lastName: string;
  dateOfBirth: Date;
  email: string;
  password: string;
  roles: string[];
  type: string;
  student?: string;
  voluntario?: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
};
