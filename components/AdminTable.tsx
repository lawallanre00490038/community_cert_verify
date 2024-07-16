"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {getAdminUsers} from "@/utils/queries/admins/manipulateAdmins" 
import { User } from "@/types/students"
import { Button } from './ui/button';
import {UpdateSlider} from './UpdateSliderAdmin';
import {WarnAction} from './WarnActionAdmin';

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

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
      console.log(response)
      setTotalPages(Math.ceil((response?.length || 0) / limit));
    } catch (error) {
      setError('Failed to fetch data');
      console.error(error);
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
      <Table className=''>
        <TableCaption>A list of all available Admins</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead onClick={() => toggleSort('id')}>Id</TableHead>
            <TableHead onClick={() => toggleSort('email')}>Email</TableHead>
            <TableHead onClick={() => toggleSort('name')}>Name</TableHead>
            <TableHead onClick={() => toggleSort('role')}>Role</TableHead>
            <TableHead className='border bg-gray-100 text-center'>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? <TableRow><TableCell colSpan={7}>Loading...</TableCell></TableRow> : AdminsToDisplayAfterFilter?.map(admin => (
            <TableRow key={admin.id}>
              <TableCell>{admin.id}</TableCell>
              <TableCell>{admin.email}</TableCell>
              <TableCell>{admin.name}</TableCell>
              <TableCell>{admin.role}</TableCell>
              <TableCell className='md:space-x-4 text-center border-2 space-y-2 lg:space-y-0'>
                {WarnAction(admin, "Delete", `
                  This action cannot be undone. This will permanently delete the
                  user and remove his/her from database. Do you want to continue?  
                `)}

                {UpdateSlider(admin, "Update")}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className='my-4 flex space-x-4 items-center'>
        <button disabled={page <= 1} onClick={() => {paginationNavigation("backward")}} className='border p-2 cursor-pointer hover:bg-slate-100'>Previous</button>
        <span> Page {page} of {totalPages} </span>
        <button disabled={page >= totalPages} onClick={() => {paginationNavigation("forward")}} className='border p-2 cursor-pointer hover:bg-slate-100'>Next</button>
      </div>
    </div>
    
  );
};

export default CertificateTable;
