import { Comment } from "./Post";

export type PostType = {
  title: string;
  id: string;
  createdAt: string;
  user: {
    name: string;
    image: string;
  };
  Comment?: Comment[];
};
