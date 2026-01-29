"use client";

import React from 'react'
import UserProfile from '@/components/UserProfile'

const Profile = () => {

  return (
    <div className='flex flex-col items-center justify-center min-h-[calc(100vh-200px)] w-full shadow-2xl rounded-3xl p-12 space-y-8 z-50'>
        <div className='w-[380px] md:w-[700px] border bg-white p-8 md:p-4 text-sm md:text-lg rounded-xl'>
          <UserProfile />
        </div>
      </div>
  )
}

export default Profile;