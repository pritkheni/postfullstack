import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Comment } from "../types/Post";
type PostProps = {
  comments?: Comment[];
  avatar: string;
  name: string;
  postTitle: string;
  id: string;
};
export default function Post({
  comments,
  avatar,
  name,
  postTitle,
  id,
}: PostProps) {
  return (
    <div className="bg-white my-8 p-8 rounded-lg">
      <div className="flex items-center gap-2">
        <Image
          width={32}
          height={32}
          src={avatar}
          alt="avater"
          className="rounded-full"
        />
        <h3 className="font-bold text-gray-700">{name}</h3>
      </div>
      <div className="my-8">
        <p className="break-all">{postTitle}</p>
      </div>
      <div className="flex cursor-pointer items-center gap-4">
        <Link href={`/posts/${id}`}>
          <p className="text-sm font-bold text-gray-700">
            {`${comments ? comments.length : "0"}`} Comments
          </p>
        </Link>
      </div>
    </div>
  );
}
