import React from 'react'
import Header from '../Components/Header'
import HeroSection from '../Components/HeroSection'
import WhyChooseUs from '../Components/WhyChoose'
import Technology from '../Components/Technologies'
import AboutRainCheckAUS from '../Components/AboutUsSection'
import CheckNowCTA from '../Components/CheckNow'
import Footer from '../Components/Footer'

function HomePage() {
  return (
    <div>
      <Header/>
      <HeroSection/>
      <WhyChooseUs/>
      <Technology/>
      <AboutRainCheckAUS/>
      <CheckNowCTA/>
      <Footer/>
    </div>
  )
}

export default HomePage