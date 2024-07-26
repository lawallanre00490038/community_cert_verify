"use client";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { TiThMenu } from "react-icons/ti";
import Link from 'next/link';
import { sideNav } from "@/components/SideBar"
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';



export function MobileMenu() {

  const pathname: string = usePathname();

  const handleSignOut = (e: any) => {
    e.preventDefault();
    signOut({ callbackUrl: '/login',  redirect:true  });
}
  
  return (
    <Sheet>
      <SheetTrigger asChild>
          <TiThMenu className='text-2xl'/>
      </SheetTrigger>
      <SheetContent side="left" className="bg-white p-0 flex items-center flex-col justify-center">
      {
            sideNav.map((item, index) => (
                <div key={index} className={`w-[100%] flex items-center justify-center  p-4 hover:border-b-2 cursor-pointer transition-all ${pathname === item.path ? 'bg-green-dsn text-white' : 'bg-white'} font-semibold`}>       
                    <Link href={item.path} className='flex items-center gap-x-4 justify-between' onClick={item.title === 'Sign Out' ? handleSignOut : undefined}>
                        <item.icon />
                        <span>{item.title}</span>
                    </Link>
                </div>
            ))
        }
      </SheetContent>
    </Sheet>
  )
}
