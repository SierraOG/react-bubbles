// login with formik

import React from "react";
import { withFormik, Form, Field } from "formik";
import axios from 'axios';

function LoginForm() {
  return (
    <Form>
      <Field type="text" name="username" placeholder="Username" />
      <Field type="password" name="password" placeholder="Password" />
      <button>Log in</button>
    </Form>
  );
}

const FormikLoginForm = withFormik({
  mapPropsToValues({ username, password }) {
    return {
      username: username || "",
      password: password || ""
    };
  },

  handleSubmit(values, {props}) {
    axios
      .post('http://localhost:5000/api/login', values)
      .then(res => {
        localStorage.setItem('token', res.data.payload);
        props.history.push("/bubbles");
      })
      .catch(err => console.log(err.response));
  }
})(LoginForm);

export default FormikLoginForm;