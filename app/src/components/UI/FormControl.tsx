import { ErrorMessage } from 'formik';
import { InputHTMLAttributes } from 'react';
import Input from './Input';

type IFormControl = {
  children: string;
  className: 'signIn' | undefined;
} & InputHTMLAttributes<HTMLInputElement>;

function FormControl({ children, ...props }: IFormControl): JSX.Element {
  return (
    <div>
      <label
        htmlFor={props.name}
        className={
          props.className === 'signIn'
            ? 'block text-sm font-medium text-gray-700'
            : undefined
        }
      >
        {children}
      </label>
      <div className='mt-1'>
        <Input {...props} className={props.className} />
      </div>
      <div className={props.className === 'signIn' ? 'text-center' : undefined}>
        <ErrorMessage name={props.name!}>
          {(msg) => (
            <label
              className={
                props.className === 'signIn'
                  ? 'mt-2 text-sm text-red-600'
                  : undefined
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
