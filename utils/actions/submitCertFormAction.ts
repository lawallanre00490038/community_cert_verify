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
    let result;
    try {
        result = await studentQuery(data)
    } catch (error) {
        redirect(`/no_record`);
    }

    redirect(`/students/${result?.certificateID}/${result?.email}/${result?.name}`);
}



// export const HandleGetStudentsCertificateForm = async (
//     state: StudentCertificatedetails,
//     formData: FormData
// ): Promise<StudentCertificatedetails> => {