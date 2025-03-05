import React from 'react'
import HeroSection from '../../Components/Frontend/Herosection'
import AboutUs from '../../Components/Frontend/Aboutus'
import Testimonials from '../../Components/Frontend/Testimonials'
import Contact from '../../Components/Frontend/Contact'
import HomeCategory from '../../Components/Frontend/HomeCategory'
const Home = () => {
  return (
    <>
      <HeroSection/>
      <AboutUs/>
      <HomeCategory/>
      <Testimonials/>
      <Contact/>
    </>
  )
}

export default Home
