"use client";

import React, { useState, useEffect } from "react";
import { getCertificates } from "@/utils/queries/students/manipulateStudentCertificateTable";
import { StudentsData } from "@/types/students";
import { WarnActionStudent } from "./WarnActionStudent";
import { UpdateSliderStudent } from "./UpdateSliderStudent";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "./ui/button";

const CertificateTable = () => {
  const [certificates, setCertificates] = useState<StudentsData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(5);
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState("certificateID");
  const [order, setOrder] = useState("asc");
  const [displayedCertificates, setDisplayedCertificates] = useState<StudentsData[]>([]);

  // Fetch data from API
  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getCertificates();
      setCertificates(response || []);
      setTotalPages(Math.ceil((response?.length || 0) / limit));
    } catch (err) {
      setError("Failed to fetch data");
      console.error(err);
    }
    setLoading(false);
  };

  // Pagination navigation
  const paginationNavigation = (direction: "forward" | "backward") => {
    setPage(prev => (direction === "forward" ? prev + 1 : prev - 1));
  };

  // Filter certificates
  useEffect(() => {
    const filtered = certificates.filter(cert =>
      Object.values(cert).some(
        val =>
          typeof val === "string" &&
          val.toLowerCase().includes(filter.toLowerCase())
      )
    );
    setTotalPages(Math.ceil(filtered.length / limit));
    setDisplayedCertificates(filtered.slice((page - 1) * limit, page * limit));
  }, [filter, certificates, page, limit]);

  // Initial data fetch
  useEffect(() => {
    setPage(1);
    fetchData();
  }, []);

  // Toggle sort
  const toggleSort = (column: keyof StudentsData) => {
    const newOrder = sort === column && order === "asc" ? "desc" : "asc";
    setSort(column);
    setOrder(newOrder);
    // Simple client-side sort
    const sorted = [...certificates].sort((a: any, b: any) => {
      if (a[column] < b[column]) return newOrder === "asc" ? -1 : 1;
      if (a[column] > b[column]) return newOrder === "asc" ? 1 : -1;
      return 0;
    });
    setCertificates(sorted);
  };

  return (
    <div className="w-full max-w-6xl flex flex-col items-center mb-20">
      {error && <p className="p-2 text-red-500">{error}</p>}

      {/* Filter input */}
      <input
        type="text"
        className="p-2 mb-4 rounded-xl border w-full max-w-4xl"
        value={filter}
        onChange={e => setFilter(e.target.value)}
        placeholder="Filter by name, email, etc..."
      />

      {/* Table */}
      <Table className="table-auto border-collapse border border-gray-300 w-full max-w-4xl h-auto">
        <TableHeader>
          <TableRow className="bg-gray-100 uppercase text-sm font-bold">
            <TableHead onClick={() => toggleSort("certificateID")}>Certificate ID</TableHead>
            <TableHead onClick={() => toggleSort("studentID")}>Student ID</TableHead>
            <TableHead onClick={() => toggleSort("name")}>Name</TableHead>
            <TableHead onClick={() => toggleSort("email")}>Email</TableHead>
            <TableHead onClick={() => toggleSort("certificationName")}>Certification Name</TableHead>
            <TableHead onClick={() => toggleSort("issuedBy")}>Issued By</TableHead>
            <TableHead className="hidden">Link</TableHead>
            <TableHead className="text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={8} className="text-center p-4">Loading...</TableCell>
            </TableRow>
          ) : displayedCertificates.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} className="text-center p-4">No records found</TableCell>
            </TableRow>
          ) : (
            displayedCertificates.map(certificate => (
              <TableRow key={certificate.id} className="hover:bg-gray-50">
                <TableCell>{certificate.certificateID}</TableCell>
                <TableCell>{certificate.studentID}</TableCell>
                <TableCell>{certificate.name}</TableCell>
                <TableCell>{certificate.email}</TableCell>
                <TableCell>{certificate.certificationName}</TableCell>
                <TableCell>{certificate.issuedBy}</TableCell>
                <TableCell className="hidden">{certificate.link}</TableCell>
                <TableCell className="text-white">
                  <div className="flex flex-col md:flex-row gap-2 justify-center items-center">
                    {WarnActionStudent(certificate, "Delete", `
                      This action cannot be undone. This will permanently delete the
                      user and remove his/her from database. Do you want to continue?
                    `)}
                    {UpdateSliderStudent(certificate, "Update")}
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {/* Pagination */}
      <div className="my-4 flex flex-wrap gap-4 items-center justify-center">
        <Button
          disabled={page <= 1}
          onClick={() => paginationNavigation("backward")}
        >
          Previous
        </Button>
        <span>Page {page} of {totalPages}</span>
        <Button
          disabled={page >= totalPages}
          onClick={() => paginationNavigation("forward")}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default CertificateTable;
