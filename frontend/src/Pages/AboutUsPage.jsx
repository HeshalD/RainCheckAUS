import React from 'react'
import Header from '../Components/Header'
import AboutUsSection from '../Components/AboutUsHero'
import OurGoalSection from '../Components/OurMission'
import Process from '../Components/Process'
import Footer from '../Components/Footer'

function AboutUsPage() {
  return (
    <div>
        <Header/>
        <AboutUsSection/>
        <OurGoalSection/>
        <Process/>
        <Footer/>
    </div>
  )
}

export default AboutUsPage