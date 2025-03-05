import * as React from 'react';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider } from 'firebase/auth';
import { auth, googleprovider } from '../../Firebase/firebaseConfig';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import ForgotPassword from '../../Components/Auth/ForgetPass';
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

const SignInContainer = styled(Stack)(({ theme }) => ({
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#4B2C35',
}));

const SignInButton = styled(Button)({
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

const SignIn = (props) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(''); // State for error messages
  const [open, setOpen] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateInputs = () => {
    let isValid = true;
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      setEmailError(true);
      isValid = false;
    } else {
      setEmailError(false);
    }
    if (!formData.password || formData.password.length < 6) {
      setPasswordError(true);
      isValid = false;
    } else {
      setPasswordError(false);
    }
    return isValid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage(''); // Reset previous errors

    if (!validateInputs()) return;

    try {
      const { email, password } = formData;
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/admin');
    } catch (error) {
      handleFirebaseError(error.code);
    }
  };

  const handleFirebaseError = (errorCode) => {
    switch (errorCode) {
      case 'auth/invalid-email':
        setErrorMessage('Invalid email format. Please check your email.');
        break;
      case 'auth/user-not-found':
        setErrorMessage('No account found with this email. Please sign up first.');
        break;
      case 'auth/wrong-password':
        setErrorMessage('Incorrect password. Please try again.');
        break;
      case 'auth/too-many-requests':
        setErrorMessage('Too many failed attempts. Please wait and try again.');
        break;
      default:
        setErrorMessage('Failed to sign in. Please check your details and try again.');
        break;
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleprovider);
      navigate('/admin');
    } catch (error) {
      setErrorMessage('Google sign-in failed. Please try again.');
    }
  };

  const handleFacebookSignIn = async () => {
    try {
      await signInWithPopup(auth, facebookProvider);
      navigate('/admin');
    } catch (error) {
      setErrorMessage('Facebook sign-in failed. Please try again.');
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <SignInContainer>
        <Card variant="outlined">
          <img src={logo} alt="logo" style={{ width: '90px', marginBottom: '10px' }} />
          <Typography variant="h4" sx={{ fontSize: '24px', fontWeight: '600', textAlign: 'center', my:2 }}>
            Sign In To <span className='text-[#B8860B]'>Fresh Baked</span>
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ display: 'flex', flexDirection: 'column', width: '100%', gap: 2 }}>
            <TextField error={emailError} name="email" placeholder="Email Address" required fullWidth onChange={handleInputChange} />
            <TextField error={passwordError} name="password" placeholder="Password" type="password" required fullWidth onChange={handleInputChange} />

            {/* Display error message */}
            {errorMessage && (
              <Typography color="error" sx={{ textAlign: 'center', mt: 1 }}>
                {errorMessage}
              </Typography>
            )}

            {/* Remember Me & Forgot Password Inline */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
              <FormControlLabel control={<Checkbox />} label="Remember me" />
              <Link component="button" type="button" onClick={handleClickOpen} variant="body2">
                Forgot Password?
              </Link>
            </Box>

            {/* Forgot Password Modal */}
            <ForgotPassword open={open} handleClose={handleClose} />

            <SignInButton type="submit" fullWidth>
              Sign in
            </SignInButton>
          </Box>

          {/* Divider with Horizontal Lines */}
          <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
            <Divider sx={{ flexGrow: 1 }} />
            <Typography sx={{ mx: 1, fontSize: '14px', fontWeight: 'bold', color: 'gray' }}>or</Typography>
            <Divider sx={{ flexGrow: 1 }} />
          </Box>

          <Button fullWidth variant="outlined" startIcon={<GoogleIcon />} onClick={handleGoogleSignIn}>
            Sign in with Google
          </Button>
          <Button fullWidth variant="outlined" startIcon={<FacebookIcon />} onClick={handleFacebookSignIn}>
            Sign in with Facebook
          </Button>

          <Typography variant="body2" sx={{ mt: 2, textAlign: 'center' }}>
            Don't have an account?{' '}
            <Link to="/signup" style={{ color: '#B8860B', fontWeight: 'bold', textDecoration: 'none' }}>
              Sign Up
            </Link>
          </Typography>
        </Card>
      </SignInContainer>
    </AppTheme>
  );
};

export default SignIn;
