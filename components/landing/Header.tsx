import React from 'react'
import Image from 'next/image'
import NavsLinks from './NavsLinks'
import Link from 'next/link'

const HeaderNav = () => {
  return (
    
    <header className=' bg-white'>

      <div className='px-[2rem] md:px-[6rem] flex justify-between items-center shadow-lg p-2'>
        <Link href="/" className='relative'>
          <Image src='/logo.png' 
          alt='logo' 
          width={150} 
          height={150} 
          className='cursor-pointer p-2'
          />
        </Link>


        <NavsLinks />
    </div>
    </header>
    
  )
}

export default HeaderNav;