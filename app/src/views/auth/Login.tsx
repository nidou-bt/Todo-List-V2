import { Formik, Form, ErrorMessage } from 'formik';
import { useContext } from 'react';
import * as Yup from 'yup';
import Button from '../../components/UI/Button';
import Input from '../../components/UI/Input';
import { UserContext } from '../../context/user-context/UserContext';

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
      <Form>
        <Input id='email' name='email' type='email'>
          Email Address
        </Input>
        <ErrorMessage name='email' />
        <Input id='password' name='password' type='password'>
          Password
        </Input>
        <ErrorMessage name='password' />
        <Button type='submit'>Submit</Button>
      </Form>
    </Formik>
  );
}

export default Login;
