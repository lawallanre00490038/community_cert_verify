"use client";   

import React from 'react'
import { HomeNavsLinks } from '../Navs/HomeNavLinks'
import { usePathname } from 'next/navigation';
import {MobileMenu} from '../MobileMenu'
import Link from 'next/link'

const NavsLinks = () => {

    const pathname: string = usePathname();
    console.log(pathname)

    
  return (
     <nav className='h-10 flex justify-between items-center my-4 md:px-4'>
        <div className='hidden md:flex justify-between items-center w-full'>
            <ul className='flex gap-x-4 text-sm text-black/50'>
                {HomeNavsLinks.map((nav, index) => (
                <li key={index} className={`cursor-pointer transition-all py-2 ${pathname === nav.path ? 'bg-green-dsn text-white' : ''} font-semibold py-1`}>
                    <Link href={nav.path} 
                    target={nav.title === "Blog" ? "_blank" : "_self"} 
                    className={`${nav.title === "Verify"? "border-green-dsn border": ""} px-8 py-2`}>{nav.title}</Link>
                </li>
                ))}
            </ul>
        </div>

        <div className='cursor-pointer z-30 md:hidden'>
            <MobileMenu navs={HomeNavsLinks}/>
        </div>
    </nav>
  )
}

export default NavsLinks