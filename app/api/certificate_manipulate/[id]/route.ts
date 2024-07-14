import { prisma } from "@/db/client"
import { NextRequest, NextResponse } from "next/server";
import { deleteCertificate, updateCertificate } from "@/lib/manipulateUserandCertificateTables"
import { revalidatePath } from "next/cache";
import layout from "@/app/(adminPages)/layout";

type Params = {
  id: string
}

export  async function DELETE(req: Request, context: { params: Params }) {

    const certificateId =  context.params.id;

    console.log("ID", certificateId)
    console.log(typeof certificateId)
  
      try {
        await deleteCertificate(certificateId)
        
        revalidatePath("/", "layout")
        return NextResponse.json( { status: 500 })
      } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
      }
  }
  


  
export  async function PUT(req: Request, context: { params: Params }) {

  const certificateId =  context.params.id
   
    const { studentID, name, email, certificationName, issuedBy, certificateID } = await req.json();

    const data = { studentID, name, email, certificationName, issuedBy, certificateID };

    console.log(data)

    try {

      const updatedCertificate = await updateCertificate(certificateId,  data)

      revalidatePath("/", "layout")
      return NextResponse.json({ result: updatedCertificate }, { status: 200 }) 

    } catch (error) {
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}

