import React from 'react'
import {studentQuery} from '@/utils/queries/students/studentQuery'
import Link from 'next/link';

const page =  async ({ params }: { params: { slug: string[] } }) => {
  const decodedParams = params.slug.map(decodeURIComponent);
  const studentDetails = await studentQuery({certificateId: decodedParams[0], email: decodedParams[1]});
  
  return (
    <>
      <div className='flex justify-center items-center flex-col h-screen m-auto container'>
        <h1 className='text-2xl font-bold text-center mb-4'>Certificate Found!</h1>
        <div className='w-full md:max-w-[600px] border bg-white p-4 text-sm md:text-lg'>
          <div className='flex justify-between items-center'>
            <span>Student Name</span>
            <span>{studentDetails?.name}</span>
          </div>
          <div className='border-t border-gray-300 my-4'></div>

          <div className='flex justify-between items-center'>
            <span>Student ID</span>
            <span>{studentDetails?.studentID}</span>
          </div>
          <div className='border-t border-gray-300 my-4'></div>

          <div className='flex justify-between items-center'>
            <span>Certification Name</span>
            <span className='self-end text-left'>{studentDetails?.certificationName}</span>
          </div>
          <div className='border-t border-gray-300 my-4'></div>

          <div className='flex justify-between items-center'>
            <span>Certificate ID</span>
            <span>{studentDetails?.certificateID}</span>
          </div>
          <div className='border-t border-gray-300 my-4'></div>

          <div className='flex justify-between items-center overflow-x-hidden'>
            <span>Certificate Link</span>
            <Link href={studentDetails?.link || '#'} target="_blank" className='text-blue-500'>Link</Link>
          </div>
          <div className='border-t border-gray-300 my-4'></div>

          <div className='flex justify-between items-center'>
            <span>Issued Date</span>
            <span>{studentDetails?.createdAt?.toLocaleDateString()}</span>
          </div>
          <div className='border-t border-gray-300 my-4'></div>

          <div className='flex justify-between items-center'>
            <span>Issued By</span>
            <span className='text-left'>{studentDetails?.issuedBy}</span>
          </div>
          <div className='border-t border-gray-300 my-4'></div>

          <Link href="/" className='block text-xs md:text-sm text-center text-green-500'>Search for another certificate?</Link>
        </div>
      </div>
    </>
  )
}

export default page