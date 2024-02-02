'use client'

import axios, { all } from "axios";
import CreatePost from "./components/CreatePost";
import { useQuery } from "@tanstack/react-query";
import Post from "./components/Post";
import { PostType } from "./types/PostType";
const allPost = async ()=>{
  const response = await axios.get("http://localhost:3000/api/posts/getPost")
  return response.data
}
export default function Home() {
  const {data,isLoading,error} = useQuery<PostType[]>({queryKey:["posts"],queryFn:allPost})
  if(error)return error
  if(isLoading)return "Loading..."
  console.log(data);
  
  return (
    <main>
      <CreatePost/>
      {data?.map((post)=> <Post key={post.id} comments={post.Comment} name={post.user.name} avatar={post.user.image} postTitle={post.title} id={post.id}/>)}
    </main>
  );
}
