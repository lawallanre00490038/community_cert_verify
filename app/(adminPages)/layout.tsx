import NavBar from '@/components/NavBar'
import SideBar from '@/components/SideBar'
import React, { ReactNode } from 'react'
import Footer from '@/components/Footer'
import toast, { Toaster } from 'react-hot-toast';


const layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
        <NavBar />
        <div className='flex gap-x-4  justify-center'>
            <SideBar />
            <div className='w-[80%] pr-2 md:pr-4'>
                {children}
                <Toaster />
            </div>
        </div>
        <Footer />
        
    </>
  )
}

export default layout