"use client";

import React, { useRef } from "react";
import { uploadCertificatesCSV } from "@/actions/UploadCertificatesCSV";
import { toast } from "@/components/ui/use-toast";

const Uploads = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!inputRef.current?.files?.length) {
      return toast({
        title: "No File Selected",
        description: "Please upload a CSV file containing the records.",
        variant: "destructive",
      });
    }

    const file = inputRef.current.files[0];

    // Check file type early
    if (!file.name.match(/\.(csv|xls|xlsx)$/i)) {
      return toast({
        title: "Invalid File Type",
        description: "Only CSV, XLS, or XLSX files are allowed.",
        variant: "destructive",
      });
    }

    const formData = new FormData();
    formData.append("certificates", file);

    try {
      const result = await uploadCertificatesCSV(formData);
    
      toast({
        title: "Upload Successful",
        description: `🎉 You uploaded ${result} record${result > 1 ? "s" : ""}!`,
        variant: "default",
      });
    
      inputRef.current.value = "";
    } catch (error: any) {
      const message = error?.message || "Unknown error";
      toast({
        title: "Upload Error",
        description: (
          <pre className="mt-2 max-h-40 w-[350px] overflow-auto rounded-md bg-slate-900 p-4 text-sm text-red-400">
            Check Your Sheet it has {message}
          </pre>
        ),
        variant: "destructive",
      });
    }
    
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] w-full shadow-2xl rounded-3xl p-12 space-y-8 z-50">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-extrabold text-green-700">
          Upload Certificates
        </h1>
        <p className="text-gray-600 text-lg">
          Upload your CSV file to validate and add certificates.
        </p>
      </div>

      {/* File Upload Form */}
      <form
        onSubmit={handleSubmit}
        className="w-full flex flex-col md:flex-row items-center gap-4"
      >
        <input
          ref={inputRef}
          type="file"
          accept=".csv, .xls, .xlsx"
          className="w-full md:flex-1 border-2 border-dashed border-green-300 rounded-xl p-6 text-center text-gray-700 hover:border-green-500 hover:bg-green-50 transition-all cursor-pointer"
        />

        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-4 rounded-xl shadow-lg transition-all active:scale-95"
        >
          Upload
        </button>
      </form>

      {/* Tips / Instructions */}
      <div className="w-full max-w-md text-center text-gray-500 text-sm self-center">
        <p>📄 Make sure your CSV has all the required headers:</p>
        <p className="mt-1 font-mono text-green-700 text-xs">
          Name, Name of Certification, Certificate ID, Certificate Link, Student
          ID, Issued Date, Issued By, Email
        </p>
      </div>
    </div>
  );
};

export default Uploads;
