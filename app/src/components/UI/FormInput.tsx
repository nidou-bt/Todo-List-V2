import { ErrorMessage } from 'formik';
import { InputHTMLAttributes } from 'react';
import Input from './Input';

type Props = {
  children: string;
} & InputHTMLAttributes<HTMLInputElement>;

function FormControl({ children, ...props }: Props): JSX.Element {

  return (
    <div>
      <label
        htmlFor={props.name}
        className='block text-sm font-medium text-gray-700'
      >
        {children}
      </label>
      <div className='mt-1'>
        <Input {...props} className='ipt-sign' />
      </div>
      <div className='text-center'>
        <ErrorMessage name={props.name!}>
          {(msg) => <label className='mt-2 text-sm text-red-600'>*{msg}</label>}
        </ErrorMessage>
      </div>
    </div>
  );
}

export default FormControl;
