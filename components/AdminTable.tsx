"use client";

import React, { useState, useEffect } from 'react';
import {getAdminUsers} from "@/utils/queries/admins/manipulateAdmins" 
import { User } from "@/types/students"
import {UpdateSliderAdmin} from './UpdateSliderAdmin';
import {WarnAction} from './WarnActionAdmin';
import {AddSliderAdmin} from './AddAdmin';
import { useSession } from "next-auth/react"

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from './ui/button';

const CertificateTable = () => {
  const [admins, setAdmins] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [filter, setFilter] = useState('');
  const [sort, setSort] = useState('id');
  const [order, setOrder] = useState('asc');
  const [AdminsToDisplayAfterFilter, setAdminsToDisplayAfterFilter] = useState<User[]>([]);


  const { data: session, status } = useSession()




  // Pagination navigation of the table
  const paginationNavigation = (direction?: string) => {
    setPage(prevPage => {
      const newPage = direction === 'forward' ? prevPage + 1 : prevPage - 1;
      return newPage;
    });
  };

  // Fetch data from the API
  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getAdminUsers();
      setAdmins(response  as User[] || [])
      setTotalPages(Math.ceil((response?.length || 0) / limit));
    } catch (error) {
      setError('Failed to fetch data');
    }
    setLoading(false);
  };


  // Implement the filter by the filter state when the filter state changes either direction
  useEffect(() => {
    const filteredAdmins = admins.filter(admin => {
      return Object.values(admin).some(value => {
        if (typeof value === 'string') {
          return value.toLowerCase().includes(filter.toLowerCase());
        }
        return false;
      });
    });
    setTotalPages(Math.ceil(filteredAdmins.length / limit));
    setAdmins(filteredAdmins);
  }, [filter]);
  
  


  // Fetch data when the component mounts and set the page to 1
  useEffect(() => {
    setPage(1);
    setLimit(10);
    fetchData();
  }, []);

  // Implement the sorting when the sort state changes either direction
  useEffect(() => {
    const certToDisplay = admins.slice((page - 1) * limit, page * limit);
    setAdminsToDisplayAfterFilter(certToDisplay);
  }, [page, admins, limit]);



  const toggleSort = (column: any) => {
    /*
    It will toggle the sort order between 'asc' and 'desc' for the given column.
    */
    const newOrder = (sort === column && order === 'asc') ? 'desc' : 'asc';
    setSort(column);
    setOrder(newOrder);
  };



  return (
    <div className='w-[100%] md:px-4'>
      
     { session?.role === "superadmin" ? <AddSliderAdmin /> : null }

      {error && <p className='p-2'>{error}</p>}
      <input
        type="text"
        className='p-2 mb-2 rounded-xl border w-1/3'
        value={filter}
        onChange={e => {
          setFilter(e.target.value);
          console.log(e.target.value);
        }}

        placeholder="Filter by name, email, etc..."
      />
      <Table className='border-collapse border border-gray-800'>
        <TableCaption className='font-extrabold'>A list of all available Admins</TableCaption>
        <TableHeader className='font-extrabold uppercase'>
          <TableRow className='border-collapse border border-gray-800'>
            {/* <TableHead onClick={() => toggleSort('id')}>Id</TableHead> */}
            <TableHead onClick={() => toggleSort('email')}>Email</TableHead>
            <TableHead onClick={() => toggleSort('name')}>Name</TableHead>
            <TableHead onClick={() => toggleSort('role')}>Role</TableHead>
            { session?.role === "superadmin" ?
              <TableHead className='border bg-gray-100 text-center'>Actions</TableHead> :
              null
            }
          </TableRow>
        </TableHeader>
        <TableBody className=''>
          {loading ? <TableRow><TableCell colSpan={7}>Loading...</TableCell></TableRow> : AdminsToDisplayAfterFilter?.map(admin => (
            <TableRow key={admin.id} className='border-collapse border border-gray-800'>
              {/* <TableCell>{admin.id}</TableCell> */}
              <TableCell>{admin.email}</TableCell>
              <TableCell>{admin.name}</TableCell>
              <TableCell>{admin.role}</TableCell>

              { session?.role === "superadmin" ?
                
              <TableCell className='md:space-x-4 text-center border-2 space-y-2 lg:space-y-0'>
                {WarnAction(admin, "Delete", `
                  This action cannot be undone. This will permanently delete the
                  user and remove his/her from database. Do you want to continue?  
                `)}
                {UpdateSliderAdmin(admin, "Update")}
              </TableCell> : null
              
              }
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className='my-4 flex space-x-4 items-center border-collapse border border-gray-800 w-auto'>
        <Button disabled={page <= 1} onClick={() => {paginationNavigation("backward")}} className='border p-2 cursor-pointer hover:bg-green-500'>Previous</Button>
        <span> Page {page} of {totalPages} </span>
        <Button disabled={page >= totalPages} onClick={() => {paginationNavigation("forward")}} className='border p-2 cursor-pointer hover:bg-green-500'>Next</Button>
      </div>
    </div>
    
  );
};

export default CertificateTable;
