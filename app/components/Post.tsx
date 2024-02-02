import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function Post({comments,avatar,name,postTitle,id}) {
  return (
    <div className='bg-white my-8 p-8 rounded-lg'>
        <div className='flex items-center gap-2'>
            <Image width={32} height={32} src={avatar} alt='avater' className='rounded-full'/>
            <h3 className='font-bold text-gray-700'>{name}</h3>
        </div>
        <div className='my-8'>
            <p className='break-all'>
                {postTitle}
            </p>
        </div>
        <div className='flex cursor-pointer items-center gap-4'>
            <Link href={`/post/${id}`}>
                <p className='text-sm font-bold text-gray-700'>Comments</p>
            </Link>
        </div>
    </div>
  )
}
