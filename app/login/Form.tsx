"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useRouter } from "next/navigation"
import { ColorRingComponent } from "@/loaders/ColorRingComponent"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import { signIn } from "next-auth/react"
import { useState } from "react"

const FormSchema = z.object({
  email: z.string().email({
    message: "Invalid email address.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters."
  })
})

export function LoginForm() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setLoading(true)
    const response = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    })

    console.log(response)

    if (response?.ok) {
      router.push("/dashboard")
      setTimeout(() => setLoading(false), 6000)
    } else {
      setLoading(false)
      toast({
        title: "You are not signed in as an Admin",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-red">{JSON.stringify(data, null, 2)}</code>
          </pre>
        ),
      })
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <h1 className="text-2xl text-center">Admin Login</h1>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="john@gmail.com" type="email" {...field} className="rounded-xl" />
              </FormControl>
              <FormDescription>
                Kindly enter your email address
              </FormDescription>
              <FormMessage className="text-red-500"/>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="password" type="password" {...field} className="rounded-xl" />
              </FormControl>
              <FormDescription>
                Kindly enter your password
              </FormDescription>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <Button type="submit" className="bg-green-dsn active:bg-green-500 rounded-xl w-full text-white flex items-center justify-center space-x-2">
          {loading && (
            <ColorRingComponent size="40" isvisible={loading}  />
          )}
          <span className="ml-4">Submit</span>
        </Button>
      </form>
    </Form>
  )
}
