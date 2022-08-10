import { Formik, Form } from 'formik';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import Button from 'components/UI/Button';
import FormControl from 'components/UI/FormControl';
import { UserContext } from 'context/user-context/UserContext';

type TInitialValues = {
  email: string;
  password: string;
};

const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email address').required('Required'),
  password: Yup.string()
    .max(15, 'Must be 15 characters or less')
    .required('Required'),
});

function Login(): JSX.Element {
  const { login } = useContext(UserContext);
  const initialValues: TInitialValues = { email: '', password: '' };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          login({ email: values.email, password: values.password });
          setSubmitting(false);
        }, 400);
      }}
    >
      <div className='min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8'>
        <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
          <div className='bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10'>
            <Form className='space-y-6'>
              <FormControl id='email' name='email' type='email' className='signIn'>
                Email Address
              </FormControl>
              <FormControl id='password' name='password' type='password' className='signIn'>
                Password
              </FormControl>
              <div className='flex items-center justify-between'>
                <div className='flex items-center'>
                <div className='text-sm'>
                  <Link
                    to={'/sign-up'}
                    className='font-medium text-indigo-600 hover:text-indigo-500'
                  >
                    SignUp
                  </Link>
                </div>
                </div>
                <div className='text-sm'>
                  <a
                    href='#'
                    className='font-medium text-indigo-600 hover:text-indigo-500'
                  >
                    Forgot your password?
                  </a>
                </div>
              </div>
              <div>
                <Button type='submit' className='signIn'>Submit</Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </Formik>
  );
}

export default Login;
