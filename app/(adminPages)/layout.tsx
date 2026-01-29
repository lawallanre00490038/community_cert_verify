import NavBar from '@/components/NavBar'
import SideBar from '@/components/SideBar'
import React, { ReactNode } from 'react'
import Footer from '@/components/Footer'
import { ToastProvider } from "@/components/ui/toast";
import { Toaster } from "@/components/ui/toaster"; // THIS renders all toast notifications


const layout = ({ children }: { children: ReactNode }) => {
  return (
    // h-screen prevents the body from growing; overflow-hidden keeps it contained
    <div className='flex flex-col h-screen overflow-hidden'>
      <NavBar />
      
      <div className='flex flex-1 overflow-hidden'> 
        {/* Sidebar: h-full makes it take the height of the parent flex area */}
        <aside className='w-[20%] hidden md:flex flex-col border-r bg-white overflow-y-auto self-center'>
          <SideBar />
        </aside>

        {/* Main Content Area: overflow-y-auto makes only this part scrollable */}
        <main className='flex-1 flex flex-col p-4 bg-gray-50 overflow-y-auto'>
          <div className='flex-1'>
            <ToastProvider>
              {children}
              <Toaster />
            </ToastProvider>
          </div>
          <Footer />
        </main>
      </div>
    </div>
  )
}

export default layout



