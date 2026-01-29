"use client";

import React from 'react';
import { LoginForm } from './Form';
import Image from 'next/image';
import Link from 'next/link';

const AdminLogin = () => {
  return (
    <section className="h-screen w-screen bg-gray-50 relative overflow-hidden">
      <div className="md:grid md:grid-cols-2 h-full">
        {/* Image & Overlay Section */}
        <div className="relative hidden md:block md:order-2 w-full h-full">
          {/* Background Image */}
          <Image
            src="/admin_login.png"
            alt="Admin background"
            fill
            className="object-cover rounded-l-3xl"
          />
          {/* Green Semi-transparent Overlay */}
          <div className="absolute inset-0 bg-green-300/60 backdrop-blur-sm rounded-l-3xl"></div>
          {/* Center Logo */}
          <div className="absolute inset-0 flex justify-center items-center">
            <Image
              src="/logo.png"
              alt="Logo"
              width={180}
              height={180}
              className="z-50 animate-pulse"
            />
          </div>
        </div>

        {/* Login Form Section */}
        <div className="flex flex-col justify-center items-center md:items-start px-6 md:px-16 py-12 md:py-24 w-full">
          <Link href="/" className="mb-8 w-full max-w-md mx-auto md:mx-0">
            <div className="flex items-center gap-6">
              <Image
                src="/logo.png"
                alt="logo"
                width={80}
                height={80}
              />
              <div className="border-l-2 border-gray-300 h-16"></div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-green-700">
                Admin Login
              </h1>
            </div>
          </Link>

          <div className="w-full max-w-md bg-white/80 backdrop-blur-lg shadow-2xl rounded-xl p-8">
            <LoginForm />
          </div>

          <p className="mt-6 text-gray-500 text-sm text-center md:text-left">
            © {new Date().getFullYear()} Your Company. All rights reserved.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AdminLogin;
