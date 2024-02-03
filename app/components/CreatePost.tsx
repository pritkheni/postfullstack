'use client'

import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios, { AxiosError } from "axios"
import React, { useState } from "react"
import toast from "react-hot-toast"

export default function CreatePost() {
    const [title,setTitle] = useState("")
    const [isDiable,setIsDisable] = useState(false)
    const [id,setID] = useState<string>()
    const queryClient = useQueryClient()
    const {mutate} = useMutation({
        mutationFn:async (title:string) => await axios.post("/api/posts/addPost",{title:title},{
            headers:{
                'Content-Type':"application/json"
            }
        }),
        onError:(error)=>{
            console.log(error);
            if(error instanceof AxiosError){
                toast.error(error?.response?.data.message,{id:id})
            }
            setIsDisable(false)
        },
        onSuccess(data) {
            console.log(data);
            toast.success("Post has been mad 🔥",{id:id})
            queryClient.invalidateQueries({queryKey:["posts"]})
            setTitle("")
            setIsDisable(false)
        },
    })



  return (
    <form onSubmit={async (e:React.FormEvent) => {
        console.log(`for submited`);
        e.preventDefault()
        setID(toast.loading("Creating your post"))
        setIsDisable(true)
        console.log(title);
        mutate(title)
    }} className="bg-white my-8 p-8 rounded-md">
        <div className="flex flex-col my-4">
            <textarea 
            className="p-4 rounded-md  text-lg my-2 bg-gray-200"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="What's in your mind buddy?"
            ></textarea>
        </div>
        <div className="flex items-center justify-between gap-2">
            <p className={`font-bold text-sm ${title.length>300?"text-red-700":"text-gray-700"}`}>{`${title.length}/300`}</p>
            <button disabled={isDiable} className="py-2 px-6 text-sm bg-teal-600 text-white rounded-xl disabled:opacity-25 ">
                Create a post
            </button>
        </div>
    </form>
  )
}
