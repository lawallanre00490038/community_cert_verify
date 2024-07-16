"use server";

import { prisma } from '@/db/client';
import { revalidatePath } from 'next/cache';


export const UpdateAdmin = async (id: string, data: any) => {
    try {
        const result = await prisma.user.update({ where: { id }, data });
        revalidatePath('/', "layout");
        return result;
    }
    catch (error) {
        const err = error as Error;
        console.error(err.message);
    }
}


export const DeleteAdmin = async (id: string) => {
    try {
        await prisma.user.delete({ where: { id } });
        revalidatePath('/', "layout");
    }
    catch (error) {
        const err = error as Error;
        console.error(err.message);
    }
}


// get all the admin users on the pplatform
export const getAdminUsers = async () => {
    try {
      const  result = await prisma.user.findMany();
      return result
    } catch (error) {
      console.error(error)
    }
  };