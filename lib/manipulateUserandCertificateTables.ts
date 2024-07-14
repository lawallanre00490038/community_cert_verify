"use server";

import {prisma } from "@/db/client"

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
    const certificate = await prisma.student_Certificate.findUnique({ where: { id } });
    if (!certificate) {
      throw new Error(`Certificate with ID ${id} does not exist.`);
    }
    await prisma.student_Certificate.delete({ where: { id } });
  } catch (error) {
    console.error(error);
  }
};


// update the certificate
export const updateCertificate = async (id: string, data: any) => {
  try {
    const  result = await prisma.student_Certificate.update({ where: { id }, data });
    return result
  } catch (error) {
    console.error(error)
  }
};


// get all the admin users on the pplatform
export const getAdminUsers = async () => {
  try {
    const  result = await prisma.user.findMany();
    return result
  } catch (error) {
    console.error(error)
  }
};

// get all the admin users on the pplatform
export const DeleteAdminUsers = async (id: string) => {
  try {
    await prisma.user.delete({ where: { id } });
    return "Admin user deleted successfully"
  } catch (error) {
    console.error(error)
  }
};