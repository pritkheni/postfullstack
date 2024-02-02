import React from 'react'
type DeleteModelProps={
    deletePost:() => void
    setToggle:(toggle:boolean) => void
}
export default function DeleteModel({deletePost,setToggle}:DeleteModelProps) {
  return (
    <div onClick={() => setToggle(false)} className='fixed bg-black/50 w-full h-full z-20 left-0 top-0'>
        <div className='absolute bg-white top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col gap-6 p-5 rounded-lg'>
            <h2 className='text-xl'>
                Are you sure, you want to delete this post? 😔 
            </h2>
            <h3 className='text-sm text-red-600'>
                Pressing the delete button will permenantly delete your post
            </h3>
            <button onClick={deletePost} className='rounded-md text-sm bg-red-600 text-white py-2 px-4'>
                Delete
            </button>
        </div>
    </div>
  )
}
