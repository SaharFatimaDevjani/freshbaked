import * as React from 'react';
import { auth } from '../../Firebase/firebaseConfig';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import { styled, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import logo from "../../Assets/Images/Frontend/logo.png";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexShrink: 0,
  borderRadius: `calc(${theme.shape.borderRadius}px + 8px)`,
  backdropFilter: 'blur(24px)',
  border: '1px solid',
  borderColor: (theme.vars || theme).palette.divider,
  backgroundColor: theme.vars
    ? `rgba(${theme.vars.palette.background.defaultChannel} / 0.4)`
    : alpha(theme.palette.background.default, 0.4),
  boxShadow: (theme.vars || theme).shadows[1],
  padding: '8px 12px',
}));

export default function Header() {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const signOut = async () => {
    // Show a confirmation toast
    toast.info(
      <div>
        <p>Are you sure you want to logout?</p>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
          <Button
            variant="contained"
            size="small"
            sx={{ backgroundColor: '#d2ac47', color: '#fff', '&:hover': { backgroundColor: '#b8943c' } }}
            onClick={async () => {
              toast.dismiss(); // Dismiss the toast
              try {
                await auth.signOut();
                navigate('/signin');
              } catch (error) {
                console.log("Logout error", error);
              }
            }}
          >
            Yes
          </Button>
          <Button
            variant="outlined"
            size="small"
            sx={{ borderColor: '#d2ac47', color: '#d2ac47', '&:hover': { borderColor: '#b8943c', color: '#b8943c' } }}
            onClick={() => toast.dismiss()} // Dismiss the toast
          >
            No
          </Button>
        </div>
      </div>,
      {
        autoClose: false, // Don't auto-close the toast
        closeButton: false, // Hide the default close button
      }
    );
  };

  const headerMenu = [
    {
      path: "customerfavourites",
      name: "Customer Favourites",
    },
    {
      path: "testimonials",
      name: "Testimonials",
    },
    {
      path: "viewmenu",
      name: "View Menu",
    },
  ];

  const handleLinkClick = (path) => {
    if (location.pathname !== '/admin') {
      navigate(`/admin`, { state: { scrollTo: path } });
    } else {
      const section = document.getElementById(path);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  React.useEffect(() => {
    if (location.pathname === '/admin' && location.state?.scrollTo) {
      const section = document.getElementById(location.state.scrollTo);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  return (
    <AppBar
      position="fixed"
      enableColorOnDark
      sx={{
        boxShadow: 0,
        bgcolor: 'transparent',
        backgroundImage: 'none',
        mt: 'calc(var(--template-frame-height, 0px) + 28px)',
        zIndex: 1,
      }}
    >
      <Container maxWidth="lg">
        <StyledToolbar variant="dense" disableGutters>
          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', px: 0 }}>
            <img className="w-40" src={logo} alt="logo" />
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              {headerMenu.map((item, index) => (
                <Button
                  key={index}
                  variant="text"
                  color="info"
                  size="small"
                  onClick={() => handleLinkClick(item.path)}
                >
                  {item.name}
                </Button>
              ))}
            </Box>
          </Box>
          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              gap: 1,
              alignItems: 'center',
            }}
          >
            <Button color="primary" variant="contained" size="small" onClick={signOut}>
              Sign out
            </Button>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' }, gap: 1 }}>
            <IconButton aria-label="Menu button" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="top"
              open={open}
              onClose={toggleDrawer(false)}
              PaperProps={{
                sx: {
                  top: 'var(--template-frame-height, 0px)',
                },
              }}
            >
              <Box sx={{ p: 2, backgroundColor: 'background.default' }}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                  }}
                >
                  <IconButton onClick={toggleDrawer(false)}>
                    <CloseRoundedIcon />
                  </IconButton>
                </Box>

                {headerMenu.map((item, index) => (
                  <MenuItem key={index} onClick={() => handleLinkClick(item.path)}>
                    {item.name}
                  </MenuItem>
                ))}

                <Divider sx={{ my: 3 }} />
                <MenuItem>
                  <Button color="primary" variant="contained" fullWidth onClick={signOut}>
                    Sign out
                  </Button>
                </MenuItem>
              </Box>
            </Drawer>
          </Box>
        </StyledToolbar>
      </Container>
      <ToastContainer
        position="top-center"
        autoClose={false}
        hideProgressBar={true}
        closeOnClick={false}
        pauseOnHover={true}
        draggable={false}
      />
    </AppBar>
  );
}