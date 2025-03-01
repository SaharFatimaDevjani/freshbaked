import React from 'react'
import { Outlet } from 'react-router-dom';
import Header from '../../Components/Frontend/Header';
import Footer from '../../Components/Frontend/Footer';

const FrontendLayout = () => {
  return (
    <>
      <Header/>
      <Outlet />
      <Footer/>
    </>
  )
}

export default FrontendLayout;
