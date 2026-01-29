import React from "react";
import CertificateTable from "@/components/CertificateTable";

const Page = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] w-full shadow-2xl rounded-3xl p-12 space-y-8 z-50">
      {/* Optional header */}
      <h1 className="text-3xl font-extrabold text-green-700 mb-6 text-center">
        Student Certificates
      </h1>

      {/* Table */}
      <div className="w-full max-w-6xl">
        <CertificateTable />
      </div>
    </div>
  );
};

export default Page;
