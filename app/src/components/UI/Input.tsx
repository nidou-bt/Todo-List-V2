import { useField, getIn } from 'formik';
import { forwardRef, InputHTMLAttributes } from 'react';

type Props = InputHTMLAttributes<HTMLInputElement> & {
  error?: boolean;
};

const Input = forwardRef<HTMLInputElement, Props>(
  ({ error, ...props }, ref): JSX.Element => {
    const [field] = useField({ ...props, name: props.name! });

    return <input ref={ref} style={error ? { borderColor: 'red'} : {}} {...props} {...field} />;
  }
);

export default Input;
