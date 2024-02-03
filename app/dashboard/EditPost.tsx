"use client";

import Image from "next/image";
import { useState } from "react";
import DeleteModel from "./DeleteModel";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";

type EditProps = {
  id: string;
  avatar: string;
  name: string;
  title: string;
  comments?: {
    id: string;
    postId: string;
    userId: string;
  }[];
};

export default function EditPost({
  avatar,
  title,
  name,
  id,
  comments,
}: EditProps) {
  const [toggle, setToggle] = useState(false);
  const queryClinet = useQueryClient();
  const [tostId, setToastId] = useState<string>();
  const { mutate } = useMutation({
    mutationFn: async (id: string) =>
      await axios.delete("/api/posts/deletePost", {
        data: id,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    onError: (error) => {
      console.log(error);
      if (error instanceof AxiosError) {
        console.log(error.response?.data?.message);
        toast.error(error.response?.data?.message, { id: tostId });
      }
    },
    onSuccess(data) {
      queryClinet.invalidateQueries({
        queryKey: ["auth-posts"],
      });
      toast.success("Successfully deleted", { id: tostId });
    },
  });
  const deletePost = () => {
    setToggle(false);
    setToastId(toast.loading("Deleting your post.."));
    mutate(id);
  };
  return (
    <>
      <div className="bg-white my-8 p-8 rounded-lg">
        <div className="flex items-center gap-2">
          <Image
            width={32}
            height={32}
            className="rounded-full"
            alt="avatar"
            src={avatar}
          />
          <h3 className="font-bold text-gray-700">{name}</h3>
        </div>
        <div className="my-8">
          <p className="break-all">{title}</p>
        </div>
        <div className="flex items-center gap-4">
          <p className="text-sm font-bold text-gray-700">
            {comments?.length} Comments
          </p>
          <button
            onClick={() => setToggle(true)}
            className="text-sm font-bold text-red-500"
          >
            Delete
          </button>
        </div>
      </div>
      {toggle && <DeleteModel deletePost={deletePost} setToggle={setToggle} />}
    </>
  );
}
