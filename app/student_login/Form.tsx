"use client";

import { Button } from "@/components/ui/button";
import { HandleGetStudentsCertificateForm } from "@/utils/actions/submitCertFormAction";
import { useForm } from "react-hook-form";
import { FormData, UserSchema } from "@/types/form";
import FormField from "@/components/FormField";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { ColorRingComponent } from "@/loaders/ColorRingComponent";

export default function Login() {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(UserSchema),
  });

  const onSubmit = async (formData: FormData) => {
    setLoading(true);
    await HandleGetStudentsCertificateForm(
      formData.certificateId,
      formData.email
    );
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col space-y-6 w-full"
    >
      {/* Certificate ID */}
      <div className="w-full">
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          Certificate ID
        </label>
        <FormField
          type="text"
          placeholder="DSNAI{the seven numbers}"
          name="certificateId"
          register={register}
          error={errors.certificateId}
          className="w-full box-border px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-dsn focus:outline-none"
        />
      </div>

      {/* Email */}
      <div className="w-full">
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          Email
        </label>
        <FormField
          type="email"
          placeholder="john@mail.com"
          name="email"
          register={register}
          error={errors.email}
          className="w-full box-border px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-dsn focus:outline-none"
        />
      </div>

      {/* Submit */}
      <Button
        type="submit"
        className="mt-6 w-full py-6 bg-green-dsn rounded-xl text-white text-base font-semibold hover:bg-green-600 transition flex items-center justify-center gap-2"
      >
        {loading && <ColorRingComponent size="24" isvisible />}
        Verify Certificate
      </Button>
    </form>
  );
}
