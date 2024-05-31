import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { TextField, Button, Typography, Box } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const notifySuccess = () => toast.success('Password reset successful!');
  const notifyError = (message) => toast.error(`Error: ${message}`);

  const handleResetPassword = async (values, setSubmitting) => {
    try {
      const res = await axios.post(`http://localhost:5000/reset/${token}`, values);
      notifySuccess();
      navigate('/login');
    } catch (err) {
      console.error('Error:', err.response.data);
      notifyError(err.response.data.message);
    }
    setSubmitting(false);
  };

  return (
    <Box className="reset-password-container" sx={{ maxWidth: 500, mx: 'auto', p: 3, backgroundColor: 'white', borderRadius: 2, boxShadow: 1 }}>
      <Typography variant="h4" gutterBottom>Reset Password</Typography>
      <Formik
        initialValues={{ password: '', confirmPassword: '' }}
        validationSchema={Yup.object({
          password: Yup.string().min(6, 'Password must be at least 6 characters').required('Required'),
          confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Required'),
        })}
        onSubmit={(values, { setSubmitting }) => {
          handleResetPassword(values, setSubmitting);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Box mb={2}>
              <Field as={TextField} type="password" id="password" name="password" label="New Password" variant="outlined" fullWidth />
              <ErrorMessage name="password" component="div" className="error" />
            </Box>
            <Box mb={2}>
              <Field as={TextField} type="password" id="confirmPassword" name="confirmPassword" label="Confirm Password" variant="outlined" fullWidth />
              <ErrorMessage name="confirmPassword" component="div" className="error" />
            </Box>
            <Button type="submit" variant="contained" color="primary" fullWidth disabled={isSubmitting}>
              Reset Password
            </Button>
          </Form>
        )}
      </Formik>
      <ToastContainer />
    </Box>
  );
};

export default ResetPassword;
