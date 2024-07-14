"use server";
import { StudentCertificatedetails } from "@/types/students";
import { redirect } from 'next/navigation'
import { studentQuery } from "@/utils/queries/studentQuery";
import { z } from 'zod'

const authSchema = z.object({
    certificateId: z.string().length(12),
    email: z.string().email(),
  })

  export const HandleGetStudentsCertificateForm = async ( certificateId: string, email:string ): Promise<StudentCertificatedetails> => {

    const data = authSchema.parse({
        certificateId: certificateId,
        email: email
    })
    
    // check Database
    try {
        const result = await studentQuery(data)
        redirect(`/students/${result?.certificateID}/${result?.email}/${result?.name}`);

    } catch (error) {
        throw new Error("Error in handling form");
    }
}



// export const HandleGetStudentsCertificateForm = async (
//     state: StudentCertificatedetails,
//     formData: FormData
// ): Promise<StudentCertificatedetails> => {