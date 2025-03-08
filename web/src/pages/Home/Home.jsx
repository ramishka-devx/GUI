import React, { useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import HeroSection from '../../comp/Hero/Hero';
import FeedBack from '../../comp/feedBack/FeedBack';
import Contact from '../../comp/Contact/Contact';
import Footer from '../../comp/footer/Footer';
import Welcome from '../../comp/welcome/Welcome';

const Home = () => {
  const contactRef = useRef(null);  
  const feedRef = useRef(null);  
  const location = useLocation();   
  useEffect(() => {
    if (location.pathname === '/feedback' && feedRef.current) {
      feedRef.current.scrollIntoView({ behavior: 'smooth' });
    }
    if (location.pathname === '/contact' && contactRef.current) {
      contactRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [location]); 


  return (
    <>
      <Welcome />
      <HeroSection />
      <FeedBack />

      <div ref={contactRef}> 
        <Contact />
      </div>
    </>
  );
};

export default Home;
