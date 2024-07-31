"use client";

import React from 'react'
import {MobileMenu} from './MobileMenu';
import Link from 'next/link';
import {CircleUser} from "lucide-react";
import { useSession } from 'next-auth/react'


const NavBar = () => {

  const { data: session, status } = useSession();
  const first = session?.user?.name?.split(' ')[0][0];
  const last = session?.user?.name?.split(' ')[1][0];

  return (
    <nav className='h-10 flex justify-between items-center my-4 px-4 md:px-0'>
      <div className='flex justify-between items-center w-full px-8'>
        <Link href="/dashboard" className='text-sm md:text-xl font-extrabold text-green-dsn py-2 rounded-xl'>DSN Community Certificate Issuer</Link>

        <div className='hidden h-10 rounded-full border-2 bg-slate-100 md:flex items-center justify-center space-x-2 px-2 hover:cursor-pointer active:bg-slate-200 transition-all'>
        <CircleUser /> <span className='text-green-dsn font-bold'>{first} {last}</span>
        </div>
      </div>
        <div className='cursor-pointer z-30 md:hidden'>
          <MobileMenu />
        </div>
    </nav>
  )
}

export default NavBar