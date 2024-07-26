"use client";

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {updateCertificate} from "@/utils/queries/students/manipulateStudentCertificateTable";
import toast, { Toaster } from 'react-hot-toast';


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
export const UpdateSliderStudent = (certificate: any, open: string) => {

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget)
    const updatedData = {
      email: formData.get('email') ? formData.get('email') : certificate.email,
      name: formData.get('name') ? formData.get('name') : certificate.name,
      link: formData.get('link') ? formData.get('name') : certificate.link,
      certificateId: formData.get('certificateId') ? formData.get('certificateId') : certificate.certificateId,
      studentID: formData.get('studentID') ? formData.get('studentID') : certificate.studentID,
      certificationName: formData.get('certificationName') ? formData.get('certificationName') : certificate.certificationName,
      issuedBy: formData.get('issuedBy') ? formData.get('issuedBy') : certificate.issuedBy
    };

    await updateCertificate(certificate.id, updatedData);
    const notifyUpdate = (msg: string) => toast(msg);
    window.location.reload();
    notifyUpdate(`Student's data updated`)
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">{open}</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader> 
          <SheetTitle>Edit Student's Details</SheetTitle>
          <SheetDescription>
            Make changes to the information here. Click save when you&apos;re done.
          </SheetDescription>
        </SheetHeader>
        <form className="grid gap-4 py-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Student Name
            </Label>
            <Input id="name" name="name" placeholder={certificate.name} type="text" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="certificateId" className="text-right">
              Certificate ID
            </Label>
            <Input id="certificateId" name="certificateId" placeholder={certificate.certificateID} type="text" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Student Email
            </Label>
            <Input id="email" name="email" placeholder={certificate.email} type="email" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="studentID" className="text-right">
              Student ID
            </Label>
            <Input id="studentID" name="studentID" placeholder={certificate.studentID} type="text" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="certificationName" className="text-right">
              Certification Name
            </Label>
            <Input id="certificationName" name="certificationName" placeholder={certificate.certificationName} type="text" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="link" className="text-right">
            Certificate Link
            </Label>
            <Input id="link" name="link" placeholder={certificate.link} type="text" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="issuedBy" className="text-right">
              Issued By
            </Label>
            <Input id="issuedBy" name="issuedBy" placeholder={certificate.issuedBy} type="text" className="col-span-3" />
          </div>
          <SheetClose asChild>
            <Button type="submit" className="hover:bg-green-500 rounded-xl">Save changes</Button>
          </SheetClose>
        </form>
      </SheetContent>
    </Sheet>
  )
}
