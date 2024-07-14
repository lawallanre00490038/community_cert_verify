import { Button } from "@/components/ui/button"
import { HandleGetStudentsCertificateForm } from "@/utils/actions/submitCertFormAction"


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

  
  return (
    <main className="flex min-h-screen m-auto items-center justify-center">
      <div className="bg-white rounded-xl">
        <h1 className="text-2xl text-center p-6 font-semibold uppercase">DSN Certificate Verification</h1>
        <span className="text-center text-sm p-6">Enter your certificate ID and email to verify your certificate</span>
        <form className="flex flex-col p-6" action={HandleGetStudentsCertificateForm}>
          <div className="mb-8 w-[350px] lg:w-[500px]">
            <label htmlFor="certificateId" className="block text-sm font-bold text-gray-700">
              Certificate ID
            </label>
            <input type="text" name="certificateId" id="certificateId" className="mt-1 p-2 border border-gray-300 rounded-md w-[100%]"  placeholder="DSNAI{the seven numbers}"/>
          </div>

          <div className="mb-8 w-[350px] lg:w-[500px]">
            <label htmlFor="email" className="block text-sm font-bold text-gray-700">
              Email
            </label>
            <input type="email" name="email" id="email" className="mt-1 p-2 border border-gray-300 rounded-md w-[100%]"  placeholder="john@mail.com"/>
          </div>

          <Button type="submit" className="mt-8 w-[100%] p-4 bg-green-800 text-white rounded-xl hover:bg-green-500  transition active:bg-green-700 active:font-semibold">Submit</Button>

          <div className="mt-8 hover:font-bold cursor-pointer text-left">
          </div>
        </form>
      </div>
    </main>
  );
}
