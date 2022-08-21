import { useField } from 'formik';
import { forwardRef, InputHTMLAttributes } from 'react';

type Props = InputHTMLAttributes<HTMLInputElement> & {
  error?: string;
};

const Input = forwardRef<HTMLInputElement, Props>(
  ({ ...props }, ref): JSX.Element => {
    const [field] = useField({...props, name: props.name!});

    return <input ref={ref} {...props} {...field} />;
  }
);

export default Input;
