import { ErrorMessage } from "formik";
import { InputHTMLAttributes } from "react";
import Input from "./Input";

type IFormControl = {
  children: string;
  variant?: "signIn";
} & InputHTMLAttributes<HTMLInputElement>;

function FormControl({
  children,
  variant,
  ...props
}: IFormControl): JSX.Element {
  return (
    <div>
      <label
        htmlFor={props.name}
        className={
          variant === "signIn"
            ? "block text-sm font-medium text-gray-700"
            : undefined
        }
      >
        {children}
      </label>
      <div className="mt-1">
        <Input
          {...props}
          className={variant === "signIn" ? "ipt-sign" : undefined}
        />
      </div>
      <div className={variant === "signIn" ? "text-center" : undefined}>
        <ErrorMessage name={props.name!}>
          {(msg) => (
            <label
              className={
                variant === "signIn" ? "mt-2 text-sm text-red-600" : undefined
              }
            >
              *{msg}
            </label>
          )}
        </ErrorMessage>
      </div>
    </div>
  );
}

export default FormControl;
