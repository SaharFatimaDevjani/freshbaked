import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from '@mui/icons-material/X';
import logo from "../../Assets/Images/Admin/footerlogo.jpg";

function Copyright() {
  return (
    <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
      {'Copyright © '}
      <Link color="text.secondary" href="https://mui.com/">
        Fresh Baked
      </Link>
      &nbsp;
      {new Date().getFullYear()}
    </Typography>
  );
}

const Footer = () => {
  return (
    <>
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: { xs: 4, sm: 8 },
          py: { xs: 8, sm: 10 },
          textAlign: { sm: 'center', md: 'left' },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            width: '100%',
            justifyContent: 'space-between',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 4,
              minWidth: { xs: '100%', sm: '60%' },
            }}
          >
            <Box sx={{ width: { xs: '100%', sm: '60%' } }}>
              <img className='w-40'
                src={logo} alt="logo" />
              <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
                Subscribe for the updates.
              </Typography>
              <InputLabel htmlFor="email-newsletter">Email</InputLabel>
              <Stack direction="row" spacing={1} useFlexGap>
                <TextField
                  id="email-newsletter"
                  hiddenLabel
                  size="small"
                  variant="outlined"
                  fullWidth
                  aria-label="Enter your email address"
                  placeholder="Your email address"
                  slotProps={{
                    htmlInput: {
                      autoComplete: 'off',
                      'aria-label': 'Enter your email address',
                    },
                  }}
                  sx={{ width: '250px' }}
                />
                <Button
                  variant="outlined"
                  size="small"
                  sx={{
                    flexShrink: 0,
                    borderColor: '#d2ac47', // Golden border
                    color: '#d2ac47', // Golden text
                    '&:hover': {
                      backgroundColor: '#fff', // White background on hover
                      borderColor: '#d2ac47', // Golden border on hover
                      color: '#d2ac47', // Golden text on hover
                    },
                  }}
                >
                  Subscribe
                </Button>
              </Stack>
            </Box>
          </Box>
          <Box
            sx={{
              display: { xs: 'none', sm: 'flex' },
              flexDirection: 'column',
              gap: 1,
            }}
          >
            <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
              Product
            </Typography>
            <Link
              color="text.secondary"
              variant="body2"
              href="#"
              sx={{
                '&:hover': {
                  color: '#d2ac47', // Golden on hover
                },
              }}
            >
              Menu
            </Link>
            <Link
              color="text.secondary"
              variant="body2"
              href="#"
              sx={{
                '&:hover': {
                  color: '#d2ac47', // Golden on hover
                },
              }}
            >
              Testimonials
            </Link>
            <Link
              color="text.secondary"
              variant="body2"
              href="#"
              sx={{
                '&:hover': {
                  color: '#d2ac47', // Golden on hover
                },
              }}
            >
              Team
            </Link>
            <Link
              color="text.secondary"
              variant="body2"
              href="#"
              sx={{
                '&:hover': {
                  color: '#d2ac47', // Golden on hover
                },
              }}
            >
              Customer favourites
            </Link>
            <Link
              color="text.secondary"
              variant="body2"
              href="#"
              sx={{
                '&:hover': {
                  color: '#d2ac47', // Golden on hover
                },
              }}
            >
              FAQs
            </Link>
          </Box>
          <Box
            sx={{
              display: { xs: 'none', sm: 'flex' },
              flexDirection: 'column',
              gap: 1,
            }}
          >
            <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
              Company
            </Typography>
            <Link
              color="text.secondary"
              variant="body2"
              href="#"
              sx={{
                '&:hover': {
                  color: '#d2ac47', // Golden on hover
                },
              }}
            >
              Team
            </Link>
            <Link
              color="text.secondary"
              variant="body2"
              href="#"
              sx={{
                '&:hover': {
                  color: '#d2ac47', // Golden on hover
                },
              }}
            >
              Testimonials
            </Link>
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            pt: { xs: 4, sm: 8 },
            width: '100%',
            borderTop: '1px solid',
            borderColor: '#d2ac47', // Golden divider line
          }}
        >
          <div>
            <Link
              color="text.secondary"
              variant="body2"
              href="#"
              sx={{
                '&:hover': {
                  color: '#d2ac47', // Golden on hover
                },
              }}
            >
              Privacy Policy
            </Link>
            <Typography sx={{ display: 'inline', mx: 0.5, opacity: 0.5 }}>
              &nbsp;•&nbsp;
            </Typography>
            <Link
              color="text.secondary"
              variant="body2"
              href="#"
              sx={{
                '&:hover': {
                  color: '#d2ac47', // Golden on hover
                },
              }}
            >
              Terms of Service
            </Link>
            <Copyright />
          </div>
          <Stack
            direction="row"
            spacing={1}
            useFlexGap
            sx={{ justifyContent: 'left', color: 'text.secondary' }}
          >
            <IconButton
              color="inherit"
              size="small"
              href="https://github.com/mui"
              aria-label="GitHub"
              sx={{
                alignSelf: 'center',
                '&:hover': {
                  color: '#d2ac47', // Golden on hover
                },
              }}
            >
              <FacebookIcon />
            </IconButton>
            <IconButton
              color="inherit"
              size="small"
              href="https://x.com/MaterialUI"
              aria-label="X"
              sx={{
                alignSelf: 'center',
                '&:hover': {
                  color: '#d2ac47', // Golden on hover
                },
              }}
            >
              <TwitterIcon />
            </IconButton>
            <IconButton
              color="inherit"
              size="small"
              href="https://www.linkedin.com/company/mui/"
              aria-label="LinkedIn"
              sx={{
                alignSelf: 'center',
                '&:hover': {
                  color: '#d2ac47', // Golden on hover
                },
              }}
            >
              <InstagramIcon />
            </IconButton>
          </Stack>
        </Box>
      </Container>
    </>
  );
};

export default Footer;