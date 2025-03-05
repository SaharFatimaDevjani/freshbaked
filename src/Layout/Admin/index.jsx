
import { Outlet } from 'react-router-dom'
import Header from '../../Components/Admin/Header'
import * as React from 'react';
import Footer from '../../Components/Admin/Footer';
import AppTheme from '../../Pages/Auth/Themes/Appthemes';

const Layout = (props) => {
  return (
    <>
     <AppTheme {...props}>
    <Header/>
    <Outlet/>
    <Footer/>
    </AppTheme>

    </>
  )
}

export default Layout