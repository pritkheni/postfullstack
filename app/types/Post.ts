export type User = {
  email: string;
  id: string;
  image: string;
  name: string;
};

export type Comment = {
  message: string;
  createdAt?: string;
  id: string;
  postId: string;
  userId: string;
  use: User;
};

export type DetailPost = {
  id: string;
  title: string;
  updatedAt: string;
  user: User;
  Comment: Comment[];
  userId: string;
  published: boolean;
};
