import { Formik, Form } from "formik";
import { useContext } from "react";
import * as Yup from "yup";
import Button from "../../components/UI/Button";
import Input from "../../components/UI/Input";
import { UserContext } from "../../context/user-context/UserContext";

type TInitialValues = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

const validationSchema = Yup.object({
  firstName: Yup.string().max(15, "Must be 15 characters or less"),
  lastName: Yup.string()
    .max(15, "Must be 15 characters or less")
    .required("Required"),
  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string()
    .max(15, "Must be 15 characters or less")
    .required("Required"),
});

function Register(): JSX.Element {
  const { register } = useContext(UserContext);
  const initialValues: TInitialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          register({ firstName: values.firstName, lastName: values.lastName ,email: values.email, password: values.password })
          setSubmitting(false);
        }, 400);
      }}
    >
      <Form>
        <Input
          id="firstName"
          name="firstName"
          type="firstName"
        >
          First Name
        </Input>
        <Input id="lastName" name="lastName" type="lastName">
          Email Address
        </Input>
        <Input id="email" name="email" type="email">
          Email Address
        </Input>
        <Input id="password" name="password" type="password">
          Password
        </Input>
        <Button type="submit" >Submit</Button>
      </Form>
    </Formik>
  );
}

export default Register;
