"use client";

import { Button } from "@/components/ui/button"
import { HandleGetStudentsCertificateForm } from "@/utils/actions/submitCertFormAction"
import { useForm } from "react-hook-form";
import { FormData, UserSchema } from "@/types/form";
import FormField from "@/components/FormField";
import { zodResolver } from "@hookform/resolvers/zod";


export default function Home() {

  // const previousState = {
  //   id: "",
  //   certificateID: "",
  //   studentID: "",
  //   name: "",
  //   email: "",
  //   certificationName: "",
  //   issuedBy: "",
  //   createdAt: null,
  //   updatedAt: null
  // } 

  // const [data, formAction] = useFormState(HandleGetStudentsCertificateForm, previousState || null );

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormData>({
    resolver: zodResolver(UserSchema), 
  });

  const onSubmit = async(formData: FormData)=>{
    await HandleGetStudentsCertificateForm(formData.certificateId, formData.email)
  }

  return (
    <main className="flex min-h-screen m-auto items-center justify-center">
      <div className="bg-white rounded-xl">
        <h1 className="text-2xl text-center px-2 mt-4 font-semibold uppercase">DSN Certificate Verification</h1>
        <span className="text-sm text-center  px-6 block">Enter your certificate ID and email to verify your certificate</span>
        <form className="flex flex-col p-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-8 w-[350px] lg:w-[500px]">
            <label htmlFor="certificateId" className="block text-sm font-bold text-gray-700">
              Certificate ID
            </label>
            <FormField
              type="text"
              placeholder="DSNAI{the seven numbers}"
              name="certificateId"
              register={register}
              error={errors.certificateId}
              valueAsNumber
              className="mt-1 p-2 border border-gray-300 rounded-md w-[100%]"
            />
          </div>

          <div className="mb-8 w-[350px] lg:w-[500px]">
            <label htmlFor="email" className="block text-sm font-bold text-gray-700">
              Email
            </label>
            <FormField
              type="email"
              placeholder="john@mail.com"
              name="email"
              register={register}
              error={errors.email}
              className="mt-1 p-2 border border-gray-300 rounded-md w-[100%]" 
            />
          </div>

          <Button type="submit" className="mt-8 w-[100%] p-4 bg-green-800 text-white rounded-xl hover:bg-green-500  transition active:bg-green-700 active:font-semibold">Submit</Button>

          <div className="mt-8 hover:font-bold cursor-pointer text-left">
          </div>
        </form>
      </div>
    </main>
  );
}
