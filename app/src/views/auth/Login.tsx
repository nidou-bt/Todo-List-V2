import { Link } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Button from 'components/UI/Button';
import FormControl from 'components/UI/FormInput';
import useUser from 'context/user-context/useUser';
import { TUser } from 'shared/types';

type TInitialValues = Pick<TUser, 'email' | 'password'>;

const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email address').required('Required'),
  password: Yup.string()
    .max(15, 'Must be 15 characters or less')
    .required('Required'),
});

function Login(): JSX.Element {
  const { onLogin } = useUser();
  const initialValues: TInitialValues = { email: '', password: '' };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, actions) => {
        setTimeout(() => {
          onLogin({ email: values.email, password: values.password });
        }, 400);
      }}
    >
      <div className='min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8'>
        <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
          <div className='bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10'>
            <Form className='space-y-6'>
              <FormControl id='email' name='email' type='email'>
                Email Address
              </FormControl>
              <FormControl id='password' name='password' type='password'>
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
                <Button type='submit' className='btn-sign'>
                  Submit
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </Formik>
  );
}

export default Login;
