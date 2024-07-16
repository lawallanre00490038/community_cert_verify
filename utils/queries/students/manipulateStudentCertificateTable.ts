"use server";

import {prisma } from "@/db/client"
import { revalidatePath } from "next/cache";

// Get all the certificates
export const getCertificates = async () => {
  try {
    const  result = await prisma.student_Certificate.findMany();
    return result
  } catch (error) {
    console.error(error)
  }
};


// delete the certificate
export const deleteCertificate = async (id: string) => {
  try {
    const certificate = await prisma.student_Certificate.delete({ where: { id } });
    if (!certificate) {
      throw new Error(`Certificate with ID ${id} does not exist.`);
    }
    revalidatePath('/', "layout");
    
  } catch (error) {
    console.error(error);
  }
};


// update the certificate
export const updateCertificate = async (id: string, data: any) => {
  try {
    const  result = await prisma.student_Certificate.update({ where: { id }, data });
    revalidatePath('/', "layout");
    return;
  } catch (error) {
    console.error(error)
  }
};



