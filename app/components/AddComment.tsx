"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { error } from "console";
import React, { useState } from "react";
import toast from "react-hot-toast";

type Comment = {
  postId?: string;
  title: string;
};

export default function AddComment({ id }: { id?: string }) {
  const [comment, setComment] = useState("");
  const [isDisable, setIsDisable] = useState(false);
  const [commentId, setCommentId] = useState<string>();
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: async (data: Comment) =>
      await axios.post("/api/posts/addComment", {
        data,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    onError: (error) => {
      console.log(error);
      setIsDisable(false);
      if (error instanceof AxiosError) {
        toast.error(error?.response?.data?.message, { id: commentId });
      }
    },
    onSuccess(data) {
      console.log(data);
      setComment("");
      setIsDisable(false);
      toast.success("Added your comment", { id: commentId });
      queryClient.invalidateQueries({
        queryKey: ["single-post"],
      });
    },
  });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsDisable(false);
    setCommentId(toast.loading("Adding your Comment..."));
    mutate({ title: comment, postId: id });
  };
  return (
    <form onSubmit={handleSubmit} className="my-8">
      <h3>Add a comment</h3>
      <div className="flex flex-col my-2">
        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          name="title"
          className="p-4 rounded-md text-lg my-2"
        />
      </div>
      <div className="flex items-center gap-2">
        <button
          disabled={isDisable}
          className="py-2 px-6 text-sm bg-teal-600 text-white rounded-xl disabled:opacity-25"
          type="submit"
        >
          Add Comment 🚀
        </button>
        <p
          className={`font-bold text-sm ${
            comment.length > 300 ? "text-red-700" : "text-gray-700"
          }`}
        >{`${comment.length}/300`}</p>
      </div>
    </form>
  );
}
