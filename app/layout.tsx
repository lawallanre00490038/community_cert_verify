import type { Metadata } from "next";
import "./globals.css";
import SessionWrapper from "@/components/SessionWrapper";
import { Poppins } from 'next/font/google';
import { ToastProvider } from "@/components/ui/toast";
import { Toaster } from "@/components/ui/toaster"; // THIS renders all toast notifications

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
  weight: ['100', '200', '300', '400', '500', '600']
});

export const metadata: Metadata = {
  title: 'Page Title',
  description: 'Page Description',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <SessionWrapper>
      <html lang="en">
        <body className={`${poppins.variable} relative`}>
          <ToastProvider>
            {children}
            <Toaster />
          </ToastProvider>
        </body>
      </html>
    </SessionWrapper>
  );
}
