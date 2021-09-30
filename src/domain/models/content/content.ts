export type Content = {
  _id: string;
  title: string;
  description: string;
  owner_id: string;
  destination_url: string;
  posted_at: Date;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
};
