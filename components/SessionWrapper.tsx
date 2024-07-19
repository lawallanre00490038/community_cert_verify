"use client";

import React from 'react'
import { SessionProvider } from "next-auth/react";

const SessionWrapper = ({ children, ...props }: {children: React.ReactNode}) => {
  return (
    <SessionProvider {...props}>
        {children}
    </SessionProvider>
  )
}

export default SessionWrapper