import React from 'react'
import { TiThMenu } from "react-icons/ti"; 
import {MobileMenu} from './MobileMenu';

const NavBar = () => {
  return (
    <nav className='h-10 flex justify-between items-center px-8 my-4'>
      <div>
        <h1 className='text-2xl'>DSN Comm</h1>
      </div>
        <div className='cursor-pointer z-30 md:hidden'>
          <MobileMenu />
        </div>
    </nav>
  )
}

export default NavBar