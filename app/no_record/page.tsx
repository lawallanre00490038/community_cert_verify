import Link from 'next/link';
import React from 'react'

const page = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg border">
        <div className="bg-green-500 rounded-t-2xl px-6 py-8 text-center">
          <h1 className="text-lg md:text-xl font-semibold text-red-700 leading-relaxed">
            No Certificate Found!
          </h1>

          <p className="mt-3 text-sm md:text-base text-white/90 leading-relaxed">
            Please contact the admin via
          </p>

          <p className="mt-1 text-sm md:text-base font-medium text-white break-all">
            aicommunity@datasciencenigeria.ai
          </p>
        </div>

        <div className="px-6 py-6 flex flex-col items-center space-y-4">
          <span className="text-xs md:text-sm text-gray-500 font-medium">
            OR
          </span>

          <Link
            href="/student_login"
            className="w-full text-center rounded-lg border border-green-500 text-green-600 py-2 text-sm md:text-base font-medium hover:bg-green-500 hover:text-white transition"
          >
            Try Again
          </Link>
        </div>
      </div>
    </div>
  )
}

export default page;