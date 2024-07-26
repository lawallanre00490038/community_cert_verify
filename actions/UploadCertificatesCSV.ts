"use server";
import csvtojson from "csvtojson"
import { StudentsData } from "@/types/students";
import {prisma} from "@/db/client"


export const uploadCertificatesCSV = async (formdata: FormData) => {

    const file = formdata.get("certificates") as File;
    if (file) {
        try {
            const text = await file.text();
            const jsonObj: StudentsData[]  = await csvtojson().fromString(text);
            const countCertificates = await prisma.student_Certificate.createMany({
                data: jsonObj
            })

            
            return countCertificates.count

        } catch (error) {
            const err = error as Error;
            console.error("Error parsing CSV:", error);
            throw new Error(err.message);
        }
    } else {
        console.error("Invalid file");
    }
};