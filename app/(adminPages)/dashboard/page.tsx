"use client";

import Image from 'next/image'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react';
import { countCertificates } from '@/utils/queries/students/manipulateStudentCertificateTable';


const Dashboard = () => {

  const [totalCertificates, setTotalCertificates] = useState<number | null>(null);
  const [count, setCount] = useState<number | undefined>(undefined);

  const Router = useRouter();

  const { data: session, status } = useSession();
  console.log(session?.role);

  useEffect(() => {
    const countCert = async () => {
      const response = await countCertificates();
      setCount(response);
    }
    countCert();
  }, []);

  return (
          
      <div className='flex items-center justify-center min-h-[calc(100vh-200px)] w-full shadow-2xl rounded-3xl p-12 space-y-8 z-50'>
        <div className='w-full md:w-1/3  h-[100px] border flex justify-center items-center bg-white space-x-8 hover:cursor-pointer
        hover:scale-[1.08] transition-all duration-300 ease-in-out'
        onClick={() => {
          if (session?.role === "superadmin") {
            return Router.push('/profile');
          }else {
            alert("You are not a superadmin");
          }
        }}
        >
          <h1 className='text-xl font-bold'>Profile</h1>
          <div className='relative'>
            <Image src='/superadmin.png' alt='superadmin' 
            className='object-squared'
            width={80} 
            height={80} 
            />
          </div>
        </div>

        <div className='w-full md:w-1/3  h-[100px] border flex justify-center 
        items-center bg-white space-x-8 hover:cursor-pointer
        hover:scale-[1.08] transition-all duration-300 ease-in-out
        '
        onClick={() => {
          Router.push('/admins');
        }}
        >
          <h1 className='text-xl font-bold'>Admins</h1>
          <div className='relative'>
            <Image src='/admin.png' alt='admin' 
            className='object-squared'
            width={100} 
            height={100} 
            />
          </div>
        </div>

        <div className='w-full md:w-1/3  h-[100px] border flex justify-center items-center bg-white space-x-8 hover:cursor-pointer hover:scale-[1.08] transition-all duration-300 ease-in-out
        '
          onClick={() => {
            Router.push('/analytics');
          }}
        >
          <h1 className='text-md font-bold'>Total Certificates</h1>
          <div className='relative'>
            <Image src='/certCount.png' alt='Certficates counts' 
            className='object-squared'
            width={50} 
            height={50} 
            />
          </div>

          <p className='font-bold'>{count}</p>

        </div>
      </div>
  )
}

export default Dashboard

