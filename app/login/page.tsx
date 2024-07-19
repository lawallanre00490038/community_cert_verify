import React from 'react'
import {LoginForm} from './Form'

const page = () => {
  return (
    <section className='container h-screen flex items-center justify-center'>
        <div className='w-[800px] bg-gray-400 p-4'>
            <LoginForm />
        </div>
    </section>
  )
}

export default page