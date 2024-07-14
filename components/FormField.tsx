import { FormFieldProps } from "@/types/form";
import { Input } from "./ui/input";

const FormField: React.FC<FormFieldProps> = ({
  type,
  placeholder,
  name,
  register,
  error,
  valueAsNumber,
  className
}) => (
  <>
    <Input
      type={type}
      placeholder={placeholder}
      {...register(name, { valueAsNumber })}
      className={className}
    />
    {error && <span className="text-red-500">{error.message}</span>}
  </>
);
export default FormField;