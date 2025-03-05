import React, { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../../Components/Frontend/Header';
import Footer from '../../Components/Frontend/Footer';
import { Box, CircularProgress } from '@mui/material';
import { LoadingContext } from '../../Contexts/LoadingContext';
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const FrontendLayout = () => {
  const { isLoading } = useContext(LoadingContext); 

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <>
      {/* Show loader if isLoading is true */}
      {isLoading && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            width: "100vw",
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            position: "fixed",
            top: 0,
            left: 0,
            zIndex: 9999, // Ensure the loader is on top of everything
          }}
        >
          <CircularProgress
            sx={{
              color: "goldenrod",
            }}
          />
        </Box>
      )}

      {/* Main content */}
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default FrontendLayout;