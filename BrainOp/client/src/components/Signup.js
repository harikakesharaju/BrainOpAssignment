

// client/components/Signup.js
import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { TextField, Button, Checkbox, FormControlLabel, Typography, Box } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
  const navigate = useNavigate();

  const notifySuccess = () => toast.success('Signup successful!');
  const notifyError = (message) => toast.error(`Signup error: ${message}`);

  const handleSignup = async (values, setSubmitting) => {
    try {
      const res = await axios.post('http://localhost:5000/signup', values);
      console.log('Signup successful:', res.data);
      localStorage.setItem('userId', res.data.userId);
      notifySuccess();
      // navigate('/posts');
      //navigating ot login as I have included login feature
      navigate('/login');
    } catch (err) {
      console.error('Signup error:', err.response.data);
      notifyError(err.response.data.message); // Assuming the error message is returned from the server
    }
    setSubmitting(false);
  };

  return (
    <Box className="signup-container" sx={{ maxWidth: 500, mx: 'auto', p: 3, backgroundColor: 'white', borderRadius: 2, boxShadow: 1 }}>
      <Typography variant="h4" gutterBottom>Sign Up</Typography>
      <Formik
        initialValues={{
          email: '',
          password: '',
          confirmPassword: '',
          name: '',
          termsAccepted: false,
        }}
        validationSchema={Yup.object({
          email: Yup.string().email('Invalid email address').required('Required'),
          password: Yup.string()
            .min(6, 'Password must be at least 6 characters')
            .required('Required'),
          confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Required'),
          name: Yup.string().required('Required'),
          termsAccepted: Yup.boolean().oneOf([true], 'You must accept the terms and conditions'),
        })}
        onSubmit={(values, { setSubmitting }) => {
          handleSignup(values, setSubmitting); // Pass setSubmitting as an argument to handleSignup
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Box mb={2}>
               <Field as={TextField} type="text" id="name" name="name" label="Name" variant="outlined" fullWidth />
               <ErrorMessage name="name" component="div" className="error" />
             </Box>
             <Box mb={2}>
               <Field as={TextField} type="email" id="email" name="email" label="Email" variant="outlined" fullWidth />
               <ErrorMessage name="email" component="div" className="error" />
            </Box>
             <Box mb={2}>
               <Field as={TextField} type="password" id="password" name="password" label="Password" variant="outlined" fullWidth />
              <ErrorMessage name="password" component="div" className="error" />
             </Box>
            <Box mb={2}>
               <Field as={TextField} type="password" id="confirmPassword" name="confirmPassword" label="Confirm Password" variant="outlined" fullWidth />
               <ErrorMessage name="confirmPassword" component="div" className="error" />
            </Box>
            <Box mb={2}> 
               <FormControlLabel 
                control={<Field as={Checkbox} type="checkbox" id="termsAccepted" name="termsAccepted" />}
                label="I accept the terms and conditions"
              />
              <ErrorMessage name="termsAccepted" component="div" className="error" />
            </Box>
            <Button type="submit" variant="contained" color="primary" fullWidth disabled={isSubmitting}>
              Sign Up
            </Button>
          </Form>
        )}
      </Formik>
      <Link to="/login">Already have an account? Login</Link> {/* Link to the login page */}
      <ToastContainer /> {/* Toast container for displaying notifications */}
    </Box>
  );
};

export default Signup;
