import * as React from 'react';
import { auth } from '../../Firebase/firebaseConfig';
import { Link } from 'react-scroll';
import { useNavigate } from 'react-router-dom';
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

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexShrink: 0,
  borderRadius: `calc(${theme.shape.borderRadius}px + 8px)`, // Corrected template literal
  backdropFilter: 'blur(24px)',
  border: '1px solid',
  borderColor: (theme.vars || theme).palette.divider,
  backgroundColor: theme.vars
    ? `rgba(${theme.vars.palette.background.defaultChannel} / 0.4)` // Corrected template literal
    : alpha(theme.palette.background.default, 0.4),
  boxShadow: (theme.vars || theme).shadows[1],
  padding: '8px 12px',
}));

export default function Header() {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const navigate = useNavigate();

  const signOut = async () => {
    const confirmation = window.confirm("Are you sure you want to logout?");
    if (confirmation) {
      try {
        await auth.signOut();
        navigate('/signin');
      } catch (error) {
        console.log("Logout error", error);
      }
    }
  };

  const headerMenu = [
    {
      path: "customerfavourites",
      name: "Customer Favourites",
    },
    {
      path: "menu",
      name: "Menu",
    },
    {
      path: "testimonials",
      name: "Testimonials",
    },
    {
      path: "faqs",
      name: "FAQs",
    },
  ];

  return (
    <AppBar
      position="fixed"
      enableColorOnDark
      sx={{
        boxShadow: 0,
        bgcolor: 'transparent',
        backgroundImage: 'none',
        mt: 'calc(var(--template-frame-height, 0px) + 28px)',
      }}
    >
      <Container maxWidth="lg">
        <StyledToolbar variant="dense" disableGutters>
          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', px: 0 }}>
            <img className="w-40" src={logo} alt="logo" />
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              {headerMenu.map((item, index) => (
                <Button key={index} variant="text" color="info" size="small">
                  <Link to={item.path} smooth={true} duration={500}>
                    {item.name}
                  </Link>
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

                <MenuItem>
                  <Link to="menu" smooth={true} duration={500}>
                    Menu
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link to="testimonials" smooth={true} duration={500}>
                    Testimonials
                  </Link>
                </MenuItem>

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
    </AppBar>
  );
}