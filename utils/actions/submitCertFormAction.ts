"use server";
import { StudentCertificatedetails } from "@/types/students";
import { redirect } from 'next/navigation'
import { studentQuery } from "@/utils/queries/studentQuery";

  export const HandleGetStudentsCertificateForm = async ( formData: FormData
    ): Promise<StudentCertificatedetails> => {

    const data = {
        certificateId: formData.get("certificateId") as string,
        email: formData.get("email") as string,
    };

    // check Database
    try {
        const result = await studentQuery(data )

    if (result !== null) {
        redirect(`/students/${result.certificateID}/${result.email}/${result.name}`);
    }else{
        redirect(`/no_record`);
    }

    } catch (error) {
        console.error(error);
        if (error instanceof Error) {
            throw error; // Re-throw the error if it's an instance of Error
        } else {
            throw new Error("An unknown error occurred"); // Handle unknown error types
        }
    }

}



// export const HandleGetStudentsCertificateForm = async (
//     state: StudentCertificatedetails,
//     formData: FormData
// ): Promise<StudentCertificatedetails> => {