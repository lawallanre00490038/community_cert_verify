"use client";

import React, { useRef } from 'react';
import { uploadCertificatesCSV } from "@/actions/UploadCertificatesCSV";
import { useFormState } from "react-dom"; // Ensure this is the correct import
import toast, { Toaster } from 'react-hot-toast';
import { styleText } from 'util';

const Uploads = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  
  const notify = (count: number | undefined) => toast(`You just uploaded ${count} records`);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputRef.current?.files?.length) {
      toast(`Did you upload any record?`,  { style: { backgroundColor: 'red', color: 'white' } });
      return;
    }
    const formData = new FormData();
    formData.append('certificates', inputRef.current.files[0]);
    const result = await uploadCertificatesCSV(formData);
    if(!result){
      return toast(`Did you upload any record?`,  { style: { backgroundColor: 'red', color: 'white' } });
    }
    console.log(result);
    notify(result);
    if (inputRef.current) {
      inputRef.current.value = ''; // Clear the input field
    }
    return result;
  }

  

  return (
    <div className='flex flex-col md:flex-row  items-center justify-center gap-x-2 space-y-4 md:space-y-0 h-[calc(100vh-100px)]'>
      <form onSubmit={handleSubmit} className='flex flex-col space-y-4'>
        <input
          ref={inputRef}
          type='file'
          className='border rounded-xl p-10 bg-green-200'
          name='certificates'
        />
        <button
          className='bg-green-200 p-4 text-xl rounded-xl hover:bg-green-400 hover:text-white hover:font-semibold transition-all active:bg-green-500'
          type='submit'
        >
          Upload
        </button>
      </form>
    </div>
  );
}

export default Uploads;
