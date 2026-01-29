"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { ColorRingComponent } from "@/loaders/ColorRingComponent";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { signIn } from "next-auth/react";
import { useState } from "react";

const FormSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(5, { message: "Password must be at least 5 characters." }),
});

export function LoginForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  // const [formError, setFormError] = useState<string | null>(null); // fallback inline error

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setLoading(true);
    // setFormError(null); // reset previous error

    try {
      const response = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      console.log(response);

      if (response?.ok) {
        toast({
          title: "Login Successful!",
          description: "Welcome back, Admin.",
          variant: "default",
        });
        router.push("/dashboard");
      } else {
        // fallback inline error
        const errorMessage =
          (response?.error as string) || "Your email or password is incorrect.";
        // setFormError(errorMessage);

        // also try showing toast (if Toaster works)
        try {
          toast({
            title: "Login Failed",
            description: errorMessage,
            variant: "destructive",
          });
        } catch {
          // swallow if toast fails
        }

        form.setFocus("email");
      }
    } catch (err) {
      console.error(err);
      // setFormError("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full">
        <h1 className="text-lg md:text-xl font-semibold text-gray-700">
          Please Enter Your Details
        </h1>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="john@example.com"
                  type="email"
                  {...field}
                  className="rounded-xl border-gray-300 focus:ring-2 focus:ring-green-500 transition-all"
                />
              </FormControl>
              <FormDescription>Kindly enter your email address</FormDescription>
              <FormMessage className="text-red-500" />
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
                <Input
                  placeholder="••••••••"
                  type="password"
                  {...field}
                  className="rounded-xl border-gray-300 focus:ring-2 focus:ring-green-500 transition-all"
                />
              </FormControl>
              <FormDescription>Kindly enter your password</FormDescription>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={loading}
          className="bg-green-600 hover:bg-green-700 active:bg-green-800 rounded-xl max-w-[200px] text-white flex items-center justify-center space-x-2 shadow-lg transition-all"
        >
          {loading && <ColorRingComponent size="30" isvisible={loading} />}
          <span className={`${loading ? "ml-2" : ""}`}>Login</span>
        </Button>

        {/* Inline fallback error */}
        {/* {formError && (
          <div className="mt-2 w-full max-w-md bg-red-100 text-red-700 p-3 rounded-md flex items-center gap-2 shadow-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 flex-shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            <span>{formError}</span>
          </div>
        )} */}
      </form>
    </Form>
  );
}
