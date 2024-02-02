
import { getServerSession } from 'next-auth'
import React from 'react'
import { authOption } from '../api/auth/[...nextauth]/options'
import { redirect } from 'next/navigation'
import DashPost from './DashPost'

export default async function Dashboard() {
  const session = await getServerSession(authOption)
  if(!session){
    redirect("api/auth/signin")
  }

  return (
    <main>
      <h1 className='font-bold text-2xl'>Welcome back {session?.user?.name}</h1>
      <DashPost/>
    </main>
  )
}
