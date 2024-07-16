"use client";

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {UpdateAdmin} from "@/utils/queries/admins/manipulateAdmins";

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
import { useRouter } from 'next/navigation';

// Update the admin user
export const UpdateSlider = (admin: any, open: string) => {

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget)
    const updatedData = {
      email: formData.get('email') ? formData.get('email') : admin.email,
      name: formData.get('name') ? formData.get('name') : admin.name,
      role: formData.get('role') ? formData.get('role') : admin.role,
    };
    const result = await UpdateAdmin(admin.id, updatedData);
      window.location.reload();
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">{open}</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader> 
          <SheetTitle>Edit Admin</SheetTitle>
          <SheetDescription>
            Make changes to the information here. Click save when you&apos;re done.
          </SheetDescription>
        </SheetHeader>
        <form className="grid gap-4 py-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Email
            </Label>
            <Input id="email" name="email" placeholder={admin.email} type="email" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Name
            </Label>
            <Input id="name" name="name" placeholder={admin.name} type="text" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Role
            </Label>
            <Input id="username" name="role" placeholder={admin.role} type="text" className="col-span-3" />
          </div>
            <SheetClose asChild>
            <Button type="submit">Save changes</Button>
          </SheetClose>
        </form>
      </SheetContent>
    </Sheet>
  )
}
