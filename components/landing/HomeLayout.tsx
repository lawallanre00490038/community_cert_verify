import React from 'react'
import HeaderNav from './Header'
import { Hero } from './Hero'
import Purpose from './Purpose'
import Security from './Security'
import Footer from './Footer'
import End from './End'


const Layout = ( ) => {
  return (
    <>
      <HeaderNav />
        <Hero />
        <div className='container'>
          <Purpose />
          <Security />
          <Footer />
        </div>
      <End /> 
    </>
  )
}


export default Layout