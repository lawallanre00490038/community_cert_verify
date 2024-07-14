import React from 'react'

const page = ({ params }: { params: { slug: string[] } }) => {
  const decodedParams = params.slug.map(decodeURIComponent);
  
  console.log(decodedParams);
  
  return (
    <div>
      <div className='flex justify-center items-center flex-col h-screen m-auto'>
        <h1 className='text-2xl'>
          Welcome {decodedParams[1]}
        </h1>
    </div>
    </div>
  )
}

export default page