"use server";
import csvtojson from "csvtojson";
import { StudentsData } from "@/types/students";
import { prisma } from "@/db/client";

// CSV column headers
const csvHeaders = {
  "Name": "name",
  "Name of Certification": "certificationName",
  "Certificate ID": "certificateID",
  "Certificate Link": "link",
  "Student ID": "studentID",
  "Issued Date": "issuedDate",
  "Issued By": "issuedBy",
  "Email": "email"
};

// Map CSV to Prisma fields
const mapCsvToPrisma = (csvRow: any) => {
  const mappedRow: any = {};
  for (const [csvHeader, prismaField] of Object.entries(csvHeaders)) {
    const value = csvRow[csvHeader] || "";
    mappedRow[prismaField] = value.trim();
  }
  return mappedRow;
};

export const uploadCertificatesCSV = async (formdata: FormData) => {
  const file = formdata.get("certificates") as File;
  if (!file) throw new Error("No file provided");

  const text = await file.text();
  const jsonArray = await csvtojson().fromString(text);

  // Validate headers
  if (!jsonArray.length) throw new Error("CSV file is empty");

  const headers = Object.keys(jsonArray[0]);
  const expectedHeaders = Object.keys(csvHeaders);
  const missingHeaders = expectedHeaders.filter(header => !headers.includes(header));

  if (missingHeaders.length > 0) {
    throw new Error(`Missing headers: ${missingHeaders.join(", ")}`);
  }

  // Map and insert
  const jsonObj: StudentsData[] = jsonArray.map(mapCsvToPrisma);
  const countCertificates = await prisma.student_Certificate.createMany({
    data: jsonObj
  });

  return countCertificates.count;
};
