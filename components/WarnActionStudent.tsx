import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"

import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';
import { deleteCertificate } from '@/utils/queries/students/manipulateStudentCertificateTable';
  
  export const  WarnActionStudent =  (certificate: any, open: string, message: string) => {

    const router = useRouter();

    const handleDelete = async () => {
        await deleteCertificate(certificate.id);
        window.location.reload();
    }


    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="outline">{open}</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
                {message}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>
                <Button onClick={ handleDelete }>Continue</Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }  