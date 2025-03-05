import React from 'react'
import HeroSection from '../../comp/Hero/Hero'
import FeedBack from '../../comp/feedBack/FeedBack'
import Contact from '../../comp/Contact/Contact'
import Footer from '../../comp/footer/Footer'

const Home = () => {
  return (
    <>
        <HeroSection />
        <FeedBack/>
        <Contact/>
    </>
  )
}

export default Home