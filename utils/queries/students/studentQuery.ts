import { prisma } from "@/db/client";

type FormType = {
    certificateId: string
    email: string
};

export const studentQuery = async(data: FormType) => {
    const result = await prisma.student_Certificate.findFirst({ 
        where: { 
            certificateID: data.certificateId,
            email: data.email
        } 
    });
    return result;
}