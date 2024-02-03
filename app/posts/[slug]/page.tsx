"use client";

import AddComment from "@/app/components/AddComment";
import Post from "@/app/components/Post";
import { DetailPost } from "@/app/types/Post";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import React from "react";

type URL = {
  params: {
    slug: string;
  };
};

const fetchPost = async (slug: string) => {
  const response = await axios.get(`/api/posts/${slug}`);
  return response.data;
};

export default function page(url: URL) {
  console.log(url.params.slug);
  const { data, isLoading, error } = useQuery<DetailPost>({
    queryKey: ["single-post"],
    queryFn: () => fetchPost(url.params.slug),
  });
  console.log(data);
  if (isLoading) {
    return <h1>Post is loading..</h1>;
  }

  return (
    <div>
      <Post
        key={data?.id}
        comments={data?.Comment}
        name={data?.user.name || ""}
        avatar={data?.user.image || ""}
        postTitle={data?.title || ""}
        id={data?.id || ""}
      />
      <AddComment id={data?.id} />
      {data?.Comment?.map((comment) => (
        <div key={comment.id} className="my-6 bg-white p-8 rounded-md">
          <div className="flex items-center gap-2">
            <Image
              width={24}
              height={24}
              src={comment.use.image}
              alt="avatar"
              className="rounded-full"
            />
            <h3 className="font-bold">{comment.use.name}</h3>
            <h2 className="text-sm">{comment?.createdAt}</h2>
          </div>
          <div className="py-4">{comment.message}</div>
        </div>
      ))}
    </div>
  );
}
