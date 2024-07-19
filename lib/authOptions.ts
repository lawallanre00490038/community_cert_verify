import { prisma } from "@/db/client";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
    session : {
        strategy: "jwt",
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
    }
}