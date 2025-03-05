import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from '@mui/icons-material/X';
import logo from "../../Assets/Images/Admin/footerlogo.jpg";
import { useNavigate, useLocation } from 'react-router-dom';

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
  const navigate = useNavigate();
  const location = useLocation();

  const headerMenu = [
    {
      path: "#customerfavourites",
      name: "Customer Favourites",
    },
    {
      path: "#testimonials",
      name: "Testimonials",
    },
    {
      path: "#viewmenu",
      name: "View Menu",
    },
  ];

  const handleLinkClick = (path) => {
    if (location.pathname !== '/admin') {
      // Navigate to /admin first
      navigate('/admin', { state: { scrollTo: path } });
    } else {
      // Scroll to the section if already on /admin
      const section = document.getElementById(path);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // Handle scrolling after navigation to /admin
  React.useEffect(() => {
    if (location.pathname === '/admin' && location.state?.scrollTo) {
      const section = document.getElementById(location.state.scrollTo);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

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
              <img className='w-40' src={logo} alt="logo" />
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
            {headerMenu.map((item, index) => (
              <Link
                key={index}
                color="text.secondary"
                variant="body2"
                href="#"
                onClick={() => handleLinkClick(item.path)}
                sx={{
                  '&:hover': {
                    color: '#d2ac47', // Golden on hover
                  },
                }}
              >
                {item.name}
              </Link>
            ))}
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
              href="https://facebook.com/mui"
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