"use server";
import { StudentCertificateDetails } from "@/types/students";
import { redirect } from 'next/navigation'
import { studentQuery } from "@/utils/queries/students/studentQuery";
import clsx from "clsx";

  export const HandleGetStudentsCertificateForm = async ( certificateId: string, email: string
    ):Promise<StudentCertificateDetails>  => {

    const data = {
        certificateId: certificateId as string,
        email: email as string,
    };

    const result = await studentQuery(data)
    console.log(result)
    
    if (result) {
        redirect(`/students/${result?.certificateID}/${result?.email}/${result?.name}`);
    }else{
        redirect(`/no_record`);
    }
}


// export const HandleGetStudentsCertificateForm = async (
//     state: StudentCertificatedetails,
//     formData: FormData
// ): Promise<StudentCertificatedetails> => {