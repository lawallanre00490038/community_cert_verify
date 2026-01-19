import { prisma } from "@/db/client";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";



declare module "next-auth" {
    interface Session {
      id: string;
      role: string;
    }
  }

export const authOptions: NextAuthOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    session : {
        
        strategy: "jwt",
    },
    pages: {
        signIn: "/login",
        signOut: "/login",
        error: "/auth/error",
        verifyRequest: "/auth/verify-request",
    },
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
        }),

        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, reg) {
                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials?.email
                    }
                }) 
                if (!user) {
                    throw new Error("No user found with the given email");
                }

                // const bcrypt = require('bcrypt');
                // if (bcrypt.compareSync(credentials?.password, user.password)) {
                //     return user;
                // } else {
                //     throw new Error("Invalid password");
                // }

                if (credentials?.password === user.password) {
                    console.log("Sure, same password")
                    return user;
                } else {
                    throw new Error("Invalid password");
                }
            }
        })
         
      ],
      callbacks: {
        async jwt({ token, user }: { token: any, user: any }) {
            if (user) {
                token.id = user.id
                token.role = user.role
            }
            return token
        },
        async session({ session, token }) {
            if (token) {
                session.id = token.id as string;
                session.role = token.role as string;
            }
            return session;
          },
        async redirect({ url, baseUrl }) {
            if (url.startsWith("/")) return `${baseUrl}${url}`;
            else if (new URL(url).origin === baseUrl) return url;
            return baseUrl;
        },
    }
}