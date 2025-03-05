import * as React from 'react';
import { createUserWithEmailAndPassword, signInWithPopup, FacebookAuthProvider } from 'firebase/auth';
import { auth, googleprovider } from '../../Firebase/firebaseConfig';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import { styled } from '@mui/material/styles';
import AppTheme from '../../Pages/Auth/Themes/Appthemes';
import { GoogleIcon, FacebookIcon } from '../../Components/Auth/SiteMarkIcons';
import logo from '../../Assets/Images/Admin/logoicon.png';

const facebookProvider = new FacebookAuthProvider();

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  maxWidth: '500px',
  boxShadow: '0px 5px 15px rgba(0,0,0,0.1)',
  borderRadius: '12px',
  backgroundColor: '#fff',
}));

const SignUpContainer = styled(Stack)(({ theme }) => ({
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#4B2C35',
}));

const SignUpButton = styled(Button)({
  backgroundColor: '#D4A017 !important',
  color: 'white',
  fontWeight: '600',
  fontSize: '16px',
  padding: '12px',
  borderRadius: '8px',
  transition: '0.3s',
  boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.2)',
  '&:hover': {
    backgroundColor: '#B8860B !important',
  },
});

const ErrorMessage = styled(Typography)({
  color: 'red',
  fontSize: '14px',
  fontWeight: 'bold',
  textAlign: 'center',
  marginTop: '10px',
});

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [errorMessage, setErrorMessage] = useState(''); // State to store errors

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage(''); // Reset error message before submission

    try {
      const { email, password } = formData;
      await createUserWithEmailAndPassword(auth, email, password);
      navigate('/admin');
    } catch (error) {
      console.error('Signup error:', error);
      handleFirebaseError(error.code); // Call function to set user-friendly error message
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      await signInWithPopup(auth, googleprovider);
      navigate('/admin');
    } catch (error) {
      console.error('Google sign-up error:', error);
      handleFirebaseError(error.code);
    }
  };

  const handleFacebookSignUp = async () => {
    try {
      await signInWithPopup(auth, facebookProvider);
      navigate('/admin');
    } catch (error) {
      console.error('Facebook sign-up error:', error);
      handleFirebaseError(error.code);
    }
  };

  // Function to set user-friendly error messages based on Firebase error codes
  const handleFirebaseError = (errorCode) => {
    switch (errorCode) {
      case 'auth/email-already-in-use':
        setErrorMessage('This email is already registered. Try signing in.');
        break;
      case 'auth/invalid-email':
        setErrorMessage('Please enter a valid email address.');
        break;
      case 'auth/weak-password':
        setErrorMessage('Password should be at least 6 characters.');
        break;
      case 'auth/network-request-failed':
        setErrorMessage('Network error! Check your connection and try again.');
        break;
      case 'auth/missing-email':
        setErrorMessage('Email is required.');
        break;
      case 'auth/internal-error':
        setErrorMessage('An unexpected error occurred. Please try again.');
        break;
      default:
        setErrorMessage('Failed to create an account. Please check your details.');
        break;
    }
  };

  return (
    <AppTheme>
      <CssBaseline enableColorScheme />
      <SignUpContainer>
        <Card variant="outlined">
          <img src={logo} alt="logo" style={{ width: '90px', marginBottom: '10px' }} />
          <Typography variant="h4" sx={{ fontSize: '24px', fontWeight: '600', textAlign: 'center', my: 2 }}>
            Sign Up To <span style={{ color: '#B8860B' }}>Fresh Baked</span>
          </Typography>

          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ display: 'flex', flexDirection: 'column', width: '100%', gap: 2 }}>
            <TextField name="name" placeholder="Name" required fullWidth onChange={handleInputChange} />
            <TextField name="email" placeholder="Email Address" required fullWidth onChange={handleInputChange} />
            <TextField name="password" placeholder="Password" type="password" required fullWidth onChange={handleInputChange} />

            <SignUpButton type="submit" fullWidth>
              Sign Up
            </SignUpButton>

            {/* Display error message here */}
            {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
          </Box>

          {/* Divider with lighter lines */}
          <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
            <Divider sx={{ flexGrow: 1, backgroundColor: '#ddd' }} />
            <Typography sx={{ mx: 1, fontSize: '14px', fontWeight: 'bold', color: 'gray' }}>or</Typography>
            <Divider sx={{ flexGrow: 1, backgroundColor: '#ddd' }} />
          </Box>

          <Button fullWidth variant="outlined" startIcon={<GoogleIcon />} onClick={handleGoogleSignUp}>
            Sign up with Google
          </Button>
          <Button fullWidth variant="outlined" startIcon={<FacebookIcon />} onClick={handleFacebookSignUp}>
            Sign up with Facebook
          </Button>

          <Typography variant="body2" sx={{ mt: 2, textAlign: 'center' }}>
            Already have an account?{' '}
            <Link to="/signin" style={{ color: '#B8860B', fontWeight: 'bold', textDecoration: 'none' }}>
              Sign In
            </Link>
          </Typography>
        </Card>
      </SignUpContainer>
    </AppTheme>
  );
};

export default SignUp;
