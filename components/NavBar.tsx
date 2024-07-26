import React from 'react'
import { TiThMenu } from "react-icons/ti"; 
import {MobileMenu} from './MobileMenu';

const NavBar = () => {
  return (
    <nav className='h-10 flex justify-between items-center my-4 px-4 md:px-0'>
      <div>
        <h1 className='text-sm md:text-2xl font-extrabold text-green-dsn bg-white p-2 rounded-xl'>DSN Community Certificate Issuer</h1>
      </div>
        <div className='cursor-pointer z-30 md:hidden'>
          <MobileMenu />
        </div>
    </nav>
  )
}

export default NavBar