import { Outlet } from 'react-router-dom';
import Header from '../../Components/Admin/Header';
import * as React from 'react';
import Footer from '../../Components/Admin/Footer';
import AppTheme from '../../Pages/Auth/Themes/Appthemes';
import { Box } from '@mui/material'; // Import Box for padding

const Layout = (props) => {
  return (
    <>
      <AppTheme {...props}>
        <Header /> 
        <Box sx={{ pt: '120px' }}> 
          <Outlet /> 
        </Box>
        <Footer /> 
      </AppTheme>
    </>
  );
};

export default Layout;