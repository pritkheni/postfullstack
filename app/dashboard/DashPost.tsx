'use client'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import { AuthPost } from '../types/AuthPost'
import EditPost from './EditPost'
const getOnlyUserPost = async () => {
    const response = await axios.get("/api/posts/authPost")
    return response.data
}

export default function DashPost() {
    const {data,isLoading,error} = useQuery<AuthPost>({queryKey:["auth-posts"],queryFn:getOnlyUserPost})
    if(isLoading){
        return <h1>Loading user post....</h1>
    }
    console.log(data);
  return (
    <div>
        {
            data?.Post.map((post) => <EditPost key={post.id} avatar={data.image} id={post.id} name={data.name} title={post.title} comments={post.Comment}/>)
        }
    </div>
  )
}
