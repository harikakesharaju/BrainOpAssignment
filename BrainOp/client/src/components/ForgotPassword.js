import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import TextField from '@mui/material/TextField'; // Import TextField from '@mui/material'
import Button from '@mui/material/Button'; // Import Button from '@mui/material'
import Typography from '@mui/material/Typography'; // Import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'; // Import Box from '@mui/material'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ForgotPassword = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const notifySuccess = () => toast.success('Password reset email sent!');
  const notifyError = (message) => toast.error(`Error: ${message}`);

  const handleForgotPassword = async (values) => {
    setIsSubmitting(true);
    try {
      const res = await axios.post('http://localhost:5000/forgot-password', values);
      notifySuccess();
    } catch (err) {
      console.error('Error:', err.response.data);
      notifyError(err.response.data.message);
    }
    setIsSubmitting(false);
  };

  return (
    <Box className="forgot-password-container" sx={{ maxWidth: 500, mx: 'auto', p: 3, backgroundColor: 'white', borderRadius: 2, boxShadow: 1 }}>
      <Typography variant="h4" gutterBottom>Forgot Password</Typography>
      <Formik
        initialValues={{ email: '' }}
        validationSchema={Yup.object({
          email: Yup.string().email('Invalid email address').required('Required'),
        })}
        onSubmit={(values) => handleForgotPassword(values)}
      >
        <Form>
          <Box mb={2}>
            <Field as={TextField} type="email" id="email" name="email" label="Email" variant="outlined" fullWidth />
            <ErrorMessage name="email" component="div" className="error" />
          </Box>
          <Button type="submit" variant="contained" color="primary" fullWidth disabled={isSubmitting}>
            Send Reset Email
          </Button>
        </Form>
      </Formik>
      <ToastContainer />
    </Box>
  );
};

export default ForgotPassword;
