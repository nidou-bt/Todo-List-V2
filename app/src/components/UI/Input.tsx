import { Field, ErrorMessage } from "formik";

type IInput = {
  children: string,
  id: string,
  name: string,
  type: string,
  className?: {label?: string, field?: string},
}

function Input({ children, id, name, type, className }: IInput): JSX.Element {
  return(
    <div>
      <label htmlFor={id || name} className={className?.label ? className.label : undefined}>{children}</label>
      <Field 
        id={id}
        name={name}
        type={type}
        className={className?.field ? className.field : undefined}
      />
      <ErrorMessage name={name} />
    </div>
  );
}

export default Input;
