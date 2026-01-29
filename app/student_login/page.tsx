"use client";

import React from "react";
import Login from "./Form";
import Image from "next/image";
import Link from "next/link";

const StudentLogin = () => {
  return (
    <section className="min-h-screen w-full bg-gray-50">
      <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen">

        {/* LEFT – IMAGE / BRAND */}
        <div className="relative hidden md:block">
          <Image
            src="/student_login.png"
            alt="Student login"
            fill
            className="object-cover"
            priority
          />

          {/* overlay */}
          <div className="absolute inset-0 bg-green-900/40" />

          {/* branding */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-8 text-center">
            <Image
              src="/logo.png"
              alt="logo"
              width={120}
              height={120}
              className="mb-6"
            />
            <h2 className="text-3xl font-extrabold">
              Certificate Verification
            </h2>
            <p className="mt-3 text-sm opacity-90 max-w-sm">
              Secure, fast and reliable certificate verification for students
              and institutions.
            </p>
          </div>
        </div>

        {/* RIGHT – FORM */}
        <div className="flex items-center justify-center px-4 md:px-8">
          <div className="w-full max-w-md">

            {/* header */}
            <Link href="/" className="flex items-center justify-center mb-8">
              <Image
                src="/logo.png"
                alt="logo"
                width={90}
                height={90}
                className="mr-4"
              />
              <div className="border-l h-12 mx-4 border-gray-300" />
              <span className="text-green-dsn font-extrabold text-lg">
                Verify Your Certificate
              </span>
            </Link>

            {/* form card */}
            <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
              <Login />
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default StudentLogin;
