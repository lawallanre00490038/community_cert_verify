"use client";

import React from 'react'
import UserProfile from '@/components/UserProfile'
import { useSession } from 'next-auth/react'

const Profile = () => {

  const { data: session, status } = useSession();

  if (session?.role !== "superadmin") {
    return <div className='grid place-content-center h-screen m-auto container'>
      <div className='w-[400px] md:w-[700px] border bg-white p-8 md:p-4 text-sm md:text-lg rounded-xl'>
        <h1 className='text-center text-red-500'>Sorry you cannot view this profile. You are not a superadmin!</h1>
      </div>
    </div>
  }
  
  return (
    <div className='grid place-content-center h-full m-auto container'>
        <div className='w-[400px] md:w-[700px] border bg-white p-8 md:p-4 text-sm md:text-lg rounded-xl'>
          <UserProfile />
        </div>
      </div>
  )
}

export default Profile;