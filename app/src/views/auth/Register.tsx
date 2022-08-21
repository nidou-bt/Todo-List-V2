import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { UserContext } from 'context/user-context/UserContext';
import Button from 'components/UI/Button';
import FormControl from 'components/UI/FormControl';

type TInitialValues = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

const validationSchema = Yup.object({
  firstName: Yup.string()
    .max(15, 'Must be 15 characters or less')
    .required('Required'),
  lastName: Yup.string()
    .max(15, 'Must be 15 characters or less')
    .required('Required'),
  email: Yup.string().email('Invalid email address').required('Required'),
  password: Yup.string()
    .max(15, 'Must be 15 characters or less')
    .min(5, 'Must be 5 characters or more')
    .required('Required'),
});

function Register(): JSX.Element {
  const { register } = useContext(UserContext);
  const initialValues: TInitialValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          register({
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            password: values.password,
          });
          setSubmitting(false);
        }, 400);
      }}
    >
      <div className='min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8'>
        <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
          <div className='bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10'>
            <Form className='space-y-6'>
              <FormControl
                id='firstName'
                name='firstName'
                type='firstName'
                variant='signIn'
              >
                First Name
              </FormControl>
              <FormControl
                id='lastName'
                name='lastName'
                type='lastName'
                variant='signIn'
              >
                Last Name
              </FormControl>
              <FormControl
                id='email'
                name='email'
                type='email'
                variant='signIn'
              >
                Email Address
              </FormControl>
              <FormControl
                id='password'
                name='password'
                type='password'
                variant='signIn'
              >
                Password
              </FormControl>
              <div className='text-sm text-center'>
                <Link
                  to={'/sign-in'}
                  className='font-medium text-indigo-600 hover:text-indigo-500 text-center'
                >
                  SignIn
                </Link>
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

export default Register;
