import { FieldError, UseFormRegister } from "react-hook-form";
import { z, ZodType } from "zod"; // Add new import

export type FormData = {
    email: string;
    certificateId: string;
  };

export type FormFieldProps = {
    type: string;
    placeholder: string;
    name: ValidFieldNames;
    register: UseFormRegister<FormData>;
    error: FieldError | undefined;
    valueAsNumber?: boolean;
    className: string
  };


  export type ValidFieldNames =
  | "email"
  | "certificateId"


 
 export const UserSchema: ZodType<FormData> = z
  .object({
    email: z.string().email(),
    certificateId: z
      .string({
        required_error: "required field",
        invalid_type_error: "Your Certificate Number is required",
      })
      .min(12)
      .max(12),
  })