import Link from 'next/link';
import React from 'react'

const page = () => {
  return (
    <div className='flex justify-center items-center flex-col h-screen m-auto container'>
      <div className='w-full md:max-w-[600px] border bg-white p-4'>
        <div className='text-sm md:text-lg text-center space-y-8 bg-green-500 p-4 pb-8'>
          <h1 className='text-xl text-red-500'>
           <i className='font-medium md:font-semibold'>No Certificate Found. Please Contact Admin via <span className='text-white'>aicommunity@datasciencenigeria.ai</span></i>
          </h1>
          {/* <Link href="/" className='block text-xs md:text-lg text-center underline text-white'>For more information, </Link> */}

          <p className='text-red-500 text-xs md:text-lg mb-8'>OR</p>
          
          <Link href="/" className='text-xs md:text-sm text-center text-white border p-2 hover:text-green-300 hover:bg-white transition hover:font-bold'>Try Again</Link>
        </div>
      </div>   
    </div>
  )
}

export default page;