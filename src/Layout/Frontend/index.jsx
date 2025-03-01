import React from 'react'
import { Outlet } from 'react-router-dom';
import Header from '../../Components/Frontend/Header';
import Footer from '../../Components/Frontend/Footer';
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const FrontendLayout = () => {
   useEffect(()=>{
      AOS.init({duration : 1000,once : true});
    },[]);
  return (
    <>
      <Header/>
      <Outlet />
      <Footer/>
    </>
  )
}

export default FrontendLayout;
