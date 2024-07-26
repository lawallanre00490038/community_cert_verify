"use client";

import React from 'react'
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { signOut } from 'next-auth/react';

// Icons 
import { LuLayoutDashboard } from "react-icons/lu";
import { GrUserAdmin } from "react-icons/gr";
import { PiUploadSimpleBold } from "react-icons/pi";
import { LiaCertificateSolid } from "react-icons/lia";
import { TbBrandGoogleAnalytics } from "react-icons/tb";
import { IoExitOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";





export const sideNav = [
    {
        title: 'Dashboard',
        icon: LuLayoutDashboard,
        path: '/dashboard'
    },
    {
        title: 'Admins',
        icon: GrUserAdmin,
        path: '/admins'
    },
    {
        title: 'Uploads',
        icon:  PiUploadSimpleBold,
        path: '/uploads'
    },
    {
        title: 'Certificates',
        icon: LiaCertificateSolid,
        path: '/certificates'
    },
    {
        title: 'Analytics',
        icon: TbBrandGoogleAnalytics,
        path: '/analytics'
    },
    {
        title: 'Profile',
        icon: CgProfile,
        path: '/profile'
    },
    {
        title: 'Sign Out',
        icon: IoExitOutline,
        path: '/signout'
    },
]

const SideBar = () => {

    const pathname: string = usePathname();
    console.log(pathname)

    const handleSignOut = (e: any) => {
        e.preventDefault();
        signOut({ callbackUrl: '/login',  redirect:true  });
    }
    
  return (
    
    <div className='w-[20%] hidden md:flex flex-col justify-center bg-white h-screen'>

        {
            sideNav.map((item, index) => (
                <div key={index} className={`flex items-center   p-4 hover:border-b-2 cursor-pointer transition-all ${pathname === item.path ? 'bg-green-dsn text-white' : 'bg-white'} font-semibold`}>       
                    <Link href={item.path} className='flex items-center gap-x-4 justify-between' onClick={item.title === 'Sign Out' ? handleSignOut : undefined}>
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