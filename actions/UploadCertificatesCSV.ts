"use server";
import csvtojson from "csvtojson"
import { StudentsData } from "@/types/students";
import {prisma} from "@/db/client"


export const uploadCertificatesCSV = async (formdata: FormData) => {

    const file = formdata.get("certificates") as File;
    if (file) {
        try {
            const text = await file.text();
            const jsonObj: StudentsData[] = await csvtojson().fromString(text);
            const countCertificates = await prisma.student_Certificate.createMany({
                data: jsonObj
            })
            console.log(countCertificates);
            return countCertificates.count

        } catch (error) {
            return null;
        }
    } else {
        console.error("Invalid file");
    }
};