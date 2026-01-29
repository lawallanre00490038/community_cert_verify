import React from 'react'
import AdminTable from '@/components/AdminTable'

const page = () => {
  return (
    <div className='flex flex-col items-center justify-center min-h-[calc(100vh-200px)] w-full shadow-2xl rounded-3xl p-12 space-y-8 z-50'>
      <AdminTable />
    </div>
  )
}

export default page