import React from 'react'

const page = ({ params }: { params: { slug: string } }) => {
  console.log(params.slug)
  return (
    <div>
      <h1>
        The students page
      </h1>
    </div>
  )
}

export default page