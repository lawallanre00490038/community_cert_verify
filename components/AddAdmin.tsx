"use client";

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { IoMdAddCircle } from "react-icons/io";
import { createAdmin } from "@/utils/queries/admins/manipulateAdmins"

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

// Update the admin user
export const AddSliderAdmin = ( ) => {


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget)
    const formDataObject = {} as { [key: string]: FormDataEntryValue };
        formData.forEach((value, key) => {
            formDataObject[key] = value;
        });
    
    const result = await createAdmin(formDataObject);
      window.location.reload();
  }

  return (
    <Sheet>
      <SheetTrigger asChild className="absolute md:top-0 right-0 top-[-50px]">

            <IoMdAddCircle  className='size-10 transition-all hover:rotate-45 cursor-pointer active:scale-[1.1]'/>
 
      </SheetTrigger>
      <SheetContent>
        <SheetHeader> 
          <SheetTitle>Add Admin</SheetTitle>
          <SheetDescription>
            Add an Admin to this Platform. Click save when you&apos;re done.
          </SheetDescription>
        </SheetHeader>
        <form className="grid gap-4 py-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Email
            </Label>
            <Input id="email" name="email" placeholder="john@datasciencenigeria.ai" type="email" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Name
            </Label>
            <Input id="name" name="name" placeholder="John Doe" type="text" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Role
            </Label>
            <Input id="username" name="role" placeholder="role" type="text" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="phone" className="text-right">
              Phone Number
            </Label>
            <Input id="phone" name="phone" placeholder="090000999" type="text" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="password" className="text-right">
              Password
            </Label>
            <Input id="password" name="password"  type="text" className="col-span-3" />
          </div>
            <SheetClose asChild>
            <Button type="submit">Save Admin</Button>
          </SheetClose>
        </form>
      </SheetContent>
    </Sheet>
  )
}
