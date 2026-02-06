"use client";

import React from 'react'
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { sideNav } from './Navs/SideNav';



const SideBar = () => {

    const pathname: string = usePathname();
    console.log(pathname)

    const handleSignOut = (e: any) => {
        e.preventDefault();
        signOut({ callbackUrl: `${process.env.NEXTAUTH_URL}/login`,  redirect:true  });
    }
    
  return (
    
    <div className='flex flex-col py-6 space-y-2 z-50'>

        {
            sideNav.map((item, index) => (
                <div key={index} className={`mx-4 flex items-center rounded-xl p-2 hover:border-b-2 cursor-pointer transition-all ${pathname === item.path ? 'bg-green-dsn text-white' : 'bg-white'} font-semibold`}>       
                    <Link href={item.path} className='flex items-center gap-x-4 justify-between space-x-8 overflow-hidden ' onClick={item.title === 'Sign Out' ? handleSignOut : undefined}>
                        <item.icon />
                        <span>{item.title}</span>
                    </Link>
                </div>
            ))
        }

    </div>
  )
}

export default SideBar