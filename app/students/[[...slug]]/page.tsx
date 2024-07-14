import React from 'react'

const page = ({ params }: { params: { slug: string[] } }) => {
  const decodedParams = params.slug.map(decodeURIComponent);
  
  console.log(decodedParams);
  
  return (
    <div>
      <div className='flex justify-center items-center flex-col h-screen'>
        <h1 className='text-2xl'>
          welcome {decodedParams[1]}
        </h1>
    </div>
    </div>
  )
}

export default page